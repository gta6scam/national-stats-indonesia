/* AngkaNusa — charts.js
 * Perender grafik SVG murni (tanpa pustaka, tanpa jaringan).
 * Semua fungsi mengembalikan string SVG yang bisa disisipkan ke halaman.
 */
(function () {
  "use strict";

  function fmt(n, decimals) {
    return n.toLocaleString("id-ID", {
      minimumFractionDigits: decimals == null ? 0 : decimals,
      maximumFractionDigits: decimals == null ? 0 : decimals
    });
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function niceMax(values) {
    var m = Math.max.apply(null, values);
    if (m <= 0) return 1;
    var pow = Math.pow(10, Math.floor(Math.log10(m)));
    return Math.ceil(m / pow) * pow;
  }

  /* Grafik garis dengan titik + label nilai. */
  function lineChart(series, opts) {
    opts = opts || {};
    var w = opts.width || 640, h = opts.height || 260;
    var padL = 52, padR = 14, padT = 18, padB = 34;
    var min = opts.min != null ? opts.min : Math.min.apply(null, series.values) * 0.98;
    var max = opts.max != null ? opts.max : niceMax(series.values);
    var n = series.values.length;
    function x(i) { return padL + (i * (w - padL - padR)) / (n - 1); }
    function y(v) { return padT + (1 - (v - min) / (max - min)) * (h - padT - padB); }
    var color = opts.color || "#0e6e6a";
    var points = series.values.map(function (v, i) { return x(i).toFixed(1) + "," + y(v).toFixed(1); }).join(" ");
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(series.title || "grafik garis") + '">';
    for (var g = 0; g <= 4; g++) {
      var gv = min + (max - min) * g / 4, gy = y(gv);
      out += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) + '" stroke="#e3e8ea" stroke-width="1"/>';
      out += '<text x="' + (padL - 6) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#667085">' + fmt(gv, opts.decimals || 0) + '</text>';
    }
    out += '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>';
    series.values.forEach(function (v, i) {
      out += '<circle cx="' + x(i).toFixed(1) + '" cy="' + y(v).toFixed(1) + '" r="4" fill="#fff" stroke="' + color + '" stroke-width="2.5"/>';
      var anchor = i === 0 ? "start" : (i === series.values.length - 1 ? "end" : "middle");
      var lx = i === 0 ? x(i) + 8 : (i === series.values.length - 1 ? x(i) - 8 : x(i));
      out += '<text x="' + lx.toFixed(1) + '" y="' + (y(v) - 10).toFixed(1) + '" text-anchor="' + anchor + '" font-size="12" font-weight="700" fill="#12312f">' + fmt(v, opts.decimals || 0) + '</text>';
      out += '<text x="' + x(i).toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="12" fill="#475467">' + series.years[i] + '</text>';
    });
    out += "</svg>";
    return out;
  }

  /* Grafik batang vertikal dengan label nilai di atas batang. */
  function barChart(series, opts) {
    opts = opts || {};
    var w = opts.width || 640, h = opts.height || 260;
    var padL = 52, padR = 14, padT = 24, padB = 34;
    var max = opts.max != null ? opts.max : niceMax(series.values);
    var min = opts.min != null ? opts.min : 0;
    var n = series.values.length;
    var slot = (w - padL - padR) / n, bw = Math.min(64, slot * 0.55);
    function y(v) { return padT + (1 - (v - min) / (max - min)) * (h - padT - padB); }
    var colors = opts.colors || ["#0e6e6a", "#128a7f", "#17a398", "#f2a33c", "#d97706"];
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(series.title || "grafik batang") + '">';
    for (var g = 0; g <= 4; g++) {
      var gv = min + (max - min) * g / 4, gy = y(gv);
      out += '<line x1="' + padL + '" y1="' + gy.toFixed(1) + '" x2="' + (w - padR) + '" y2="' + gy.toFixed(1) + '" stroke="#e3e8ea" stroke-width="1"/>';
      out += '<text x="' + (padL - 6) + '" y="' + (gy + 4).toFixed(1) + '" text-anchor="end" font-size="11" fill="#667085">' + fmt(gv, opts.decimals || 0) + '</text>';
    }
    series.values.forEach(function (v, i) {
      var bx = padL + i * slot + (slot - bw) / 2;
      var by = y(v), bh = Math.max(2, (h - padB) - by);
      out += '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + bh.toFixed(1) + '" rx="4" fill="' + colors[i % colors.length] + '"/>';
      out += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (by - 7).toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#12312f">' + fmt(v, opts.decimals || 0) + '</text>';
      out += '<text x="' + (bx + bw / 2).toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle" font-size="12" fill="#475467">' + series.years[i] + '</text>';
    });
    out += "</svg>";
    return out;
  }

  /* Grafik batang horizontal berlabel (untuk peringkat provinsi). */
  function hbarChart(rows, opts) {
    opts = opts || {};
    var w = opts.width || 640;
    var rowH = opts.rowHeight || 34, padT = 8, padB = 8;
    var h = padT + padB + rows.length * rowH;
    var labelW = opts.labelWidth || 150, valW = 62;
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }));
    var color = opts.color || "#0e6e6a";
    var out = '<svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + esc(opts.title || "grafik batang horizontal") + '">';
    rows.forEach(function (r, i) {
      var y = padT + i * rowH;
      var bw = (w - labelW - valW - 16) * (r.value / max);
      out += '<text x="0" y="' + (y + rowH / 2 + 4).toFixed(1) + '" font-size="13" fill="#1d2939">' + esc(r.label) + '</text>';
      out += '<rect x="' + labelW + '" y="' + (y + 6).toFixed(1) + '" width="' + Math.max(2, bw).toFixed(1) + '" height="' + (rowH - 14) + '" rx="4" fill="' + (i === 0 ? "#d97706" : color) + '"/>';
      out += '<text x="' + (labelW + Math.max(2, bw) + 8).toFixed(1) + '" y="' + (y + rowH / 2 + 4).toFixed(1) + '" font-size="13" font-weight="700" fill="#12312f">' + fmt(r.value, opts.decimals || 0) + (opts.unit || "") + '</text>';
    });
    out += "</svg>";
    return out;
  }

  /* Donat pangsa dengan legenda di bawah. */
  function donutChart(slices, opts) {
    opts = opts || {};
    var size = opts.size || 300, cx = size / 2, cy = size / 2, r = size / 2 - 14, ir = r * 0.58;
    var colors = ["#0e6e6a", "#f2a33c", "#17a398", "#d97706", "#5b8def", "#98a2b3"];
    var total = slices.reduce(function (a, s) { return a + s.value; }, 0);
    var a0 = -Math.PI / 2;
    var out = '<svg viewBox="0 0 ' + size + ' ' + size + '" role="img" aria-label="' + esc(opts.title || "diagram donat") + '">';
    slices.forEach(function (s, i) {
      var a1 = a0 + (s.value / total) * Math.PI * 2;
      var large = (a1 - a0) > Math.PI ? 1 : 0;
      var x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
      var x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
      var xi1 = cx + ir * Math.cos(a1), yi1 = cy + ir * Math.sin(a1);
      var xi0 = cx + ir * Math.cos(a0), yi0 = cy + ir * Math.sin(a0);
      out += '<path d="M ' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A ' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1) + ' L ' + xi1.toFixed(1) + ' ' + yi1.toFixed(1) + ' A ' + ir + ' ' + ir + ' 0 ' + large + ' 0 ' + xi0.toFixed(1) + ' ' + yi0.toFixed(1) + ' Z" fill="' + colors[i % colors.length] + '"/>';
      var am = (a0 + a1) / 2, lx = cx + (r + 26) * Math.cos(am) * 0.82, ly = cy + (r + 26) * Math.sin(am) * 0.82;
      if (s.value >= 5) {
        out += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" text-anchor="middle" font-size="12" font-weight="700" fill="#12312f">' + fmt(s.value, 1) + '%</text>';
      }
      a0 = a1;
    });
    out += '<text x="' + cx + '" y="' + (cy - 4) + '" text-anchor="middle" font-size="22" font-weight="800" fill="#12312f">' + fmt(slices[0].value, 1) + '%</text>';
    out += '<text x="' + cx + '" y="' + (cy + 16) + '" text-anchor="middle" font-size="12" fill="#475467">di Pulau Jawa</text>';
    out += "</svg>";
    return out;
  }

  window.ANGKA_CHARTS = {
    fmt: fmt, esc: esc, lineChart: lineChart, barChart: barChart,
    hbarChart: hbarChart, donutChart: donutChart
  };
})();
