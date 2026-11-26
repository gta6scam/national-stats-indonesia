/* AngkaNusa — app.js
 * Interaksi: navigasi aktif, sortir tabel, filter provinsi,
 * tab grafik, dan pemasangan grafik dari data.js.
 */
(function () {
  "use strict";
  var D = window.ANGKA, C = window.ANGKA_CHARTS;
  if (!D || !C) return;

  /* Tandai tautan navigasi halaman aktif. */
  function markActiveNav() {
    var page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav a").forEach(function (a) {
      if (a.getAttribute("href") === page) a.classList.add("active");
    });
  }

  /* Pasang semua grafik yang ditandai data-chart. */
  function mountCharts() {
    document.querySelectorAll("[data-chart]").forEach(function (el) {
      var kind = el.getAttribute("data-chart");
      var key = el.getAttribute("data-series");
      var series = D[key];
      if (!series) return;
      if (kind === "line") {
        el.innerHTML = C.lineChart(series, { decimals: key === "hdi" ? 2 : (key === "populationTrend" ? 1 : 2) });
      } else if (kind === "bar") {
        el.innerHTML = C.barChart(series, { decimals: key === "gdpNominal" ? 0 : 2 });
      } else if (kind === "donut") {
        el.innerHTML = C.donutChart(series.slices, { title: series.title });
      } else if (kind === "hbars") {
        var rows = D.provinces.slice(0, 8).map(function (p) { return { label: p.name, value: p.pop }; });
        el.innerHTML = C.hbarChart(rows, { decimals: 2, unit: " jt" });
      } else if (kind === "density") {
        var dens = D.provinces.filter(function (p) { return p.density; })
          .sort(function (a, b) { return b.density - a.density; })
          .map(function (p) { return { label: p.name, value: p.density }; });
        el.innerHTML = C.hbarChart(dens, { decimals: 0, unit: "" });
      }
    });
  }

  /* Isi kartu KPI di beranda dari data.js. */
  function mountKpis() {
    var grid = document.getElementById("kpiGrid");
    if (!grid) return;
    grid.innerHTML = D.kpi.map(function (k) {
      return '<article class="kpi"><p class="kpi-label">' + C.esc(k.label) + '</p>' +
        '<p class="kpi-value">' + C.esc(k.value) + '</p>' +
        '<p class="kpi-sub">' + C.esc(k.sub) + '</p>' +
        '<p class="kpi-delta">' + C.esc(k.delta) + '</p>' +
        '<p class="kpi-src">Sumber: ' + C.esc(k.source) + '</p></article>';
    }).join("");
  }

  /* Tabel provinsi: render + sortir + filter pulau + cari nama. */
  var provSort = { key: "pop", dir: -1 };
  function renderProvinces() {
    var tbody = document.getElementById("provBody");
    if (!tbody) return;
    var q = (document.getElementById("provSearch") || { value: "" }).value.trim().toLowerCase();
    var island = (document.getElementById("provIsland") || { value: "all" }).value;
    var total = D.provinces.reduce(function (a, p) { return a + p.pop; }, 0);
    var rows = D.provinces.filter(function (p) {
      return (island === "all" || p.island === island) &&
        (!q || p.name.toLowerCase().indexOf(q) !== -1);
    }).slice().sort(function (a, b) {
      var k = provSort.key, d = provSort.dir;
      if (k === "name" || k === "island") return a[k].localeCompare(b[k]) * d;
      return (a[k] - b[k]) * d;
    });
    var all = D.provinces.reduce(function (a, p) { return a + p.pop; }, 0);
    tbody.innerHTML = rows.map(function (p, i) {
      var share = (p.pop / 281.6 * 100);
      return "<tr><td>" + (i + 1) + "</td><td>" + C.esc(p.name) + "</td><td>" +
        C.esc(p.island) + "</td><td class=\"num\">" + C.fmt(p.pop, 2) + "</td><td class=\"num\">" +
        C.fmt(share, 2) + "%</td><td class=\"num\">" +
        (p.density ? C.fmt(p.density, 0) : "—") + "</td></tr>";
    }).join("") || '<tr><td colspan="6">Tidak ada provinsi yang cocok dengan filter.</td></tr>';
    var count = document.getElementById("provCount");
    if (count) count.textContent = rows.length + " dari " + D.provinces.length + " provinsi dalam tabel ini · total 12 provinsi terpadat = " + C.fmt(total, 2) + " juta jiwa";
  }

  function bindProvinceTable() {
    var table = document.getElementById("provTable");
    if (!table) return;
    table.querySelectorAll("th[data-sort]").forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.getAttribute("data-sort");
        if (provSort.key === k) provSort.dir *= -1; else { provSort.key = k; provSort.dir = k === "name" || k === "island" ? 1 : -1; }
        renderProvinces();
      });
    });
    var s = document.getElementById("provSearch"), f = document.getElementById("provIsland");
    if (s) s.addEventListener("input", renderProvinces);
    if (f) f.addEventListener("change", renderProvinces);
    renderProvinces();
  }

  /* Tab grafik di halaman ekonomi: ganti seri yang tampil. */
  function bindEconTabs() {
    var tabs = document.querySelectorAll("[data-econ-tab]");
    if (!tabs.length) return;
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        var key = btn.getAttribute("data-econ-tab");
        var holder = document.getElementById("econChart");
        var cap = document.getElementById("econCaption");
        var series = D[key];
        if (!holder || !series) return;
        holder.innerHTML = key === "gdpGrowth" || key === "gdpNominal"
          ? C.barChart(series, { decimals: key === "gdpNominal" ? 0 : 2 })
          : C.lineChart(series, { decimals: 2 });
        if (cap) cap.textContent = series.title + " · " + series.unit + " · Sumber: " + series.source;
      });
    });
  }

  /* Tab seksi di halaman penduduk. */
  function bindStoryTabs() {
    var tabs = document.querySelectorAll("[data-story-tab]");
    if (!tabs.length) return;
    tabs.forEach(function (btn) {
      btn.addEventListener("click", function () {
        tabs.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var target = btn.getAttribute("data-story-tab");
        document.querySelectorAll("[data-story-panel]").forEach(function (p) {
          p.hidden = p.getAttribute("data-story-panel") !== target;
        });
      });
    });
  }

  /* Filter wilayah di halaman regions: tombol pulau. */
  function bindRegionFilter() {
    var btns = document.querySelectorAll("[data-region]");
    if (!btns.length) return;
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        btns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var island = btn.getAttribute("data-region");
        document.querySelectorAll("#regionCards .region-card").forEach(function (card) {
          card.hidden = island !== "all" && card.getAttribute("data-island") !== island;
        });
        var n = document.querySelectorAll("#regionCards .region-card:not([hidden])").length;
        var note = document.getElementById("regionCount");
        if (note) note.textContent = n + " provinsi ditampilkan";
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    markActiveNav();
    mountKpis();
    mountCharts();
    bindProvinceTable();
    bindEconTabs();
    bindStoryTabs();
    bindRegionFilter();
  });
})();
