// Ambil data faktur dari localStorage
const fakturData = JSON.parse(localStorage.getItem("fakturData"));

if (fakturData) {
  document.getElementById("nomorFaktur").textContent = fakturData.nomor;
  document.getElementById("tanggalFaktur").textContent = fakturData.tanggal;
  document.getElementById("namaPelanggan").textContent = fakturData.pelanggan;
  document.getElementById("alamatPelanggan").textContent = fakturData.alamat;
  document.getElementById("telpPelanggan").textContent = fakturData.telp;

  const jatuhTempo = new Date(fakturData.tanggal);
  jatuhTempo.setDate(jatuhTempo.getDate() + 14);
  document.getElementById("jatuhTempo").textContent =
    jatuhTempo.toLocaleDateString("id-ID");

  const tbody = document.getElementById("tabelProduk");
  tbody.innerHTML = "";
  let subtotal = 0;

  fakturData.produk.forEach((item, index) => {
    const total = item.jumlah * item.harga;
    subtotal += total;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.produk}</td>
      <td>${item.jumlah}</td>
      <td>Rp ${item.harga.toLocaleString("id-ID")}</td>
      <td>Rp ${total.toLocaleString("id-ID")}</td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("subtotal").textContent =
    "Rp " + subtotal.toLocaleString("id-ID");
  document.getElementById("total").textContent =
    "Rp " + subtotal.toLocaleString("id-ID");
  document.getElementById("terbilang").textContent =
    terbilang(subtotal) + " rupiah";
}

function terbilang(n) {
  const satuan = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
  ];

  function toWords(num) {
    if (num < 10) return satuan[num];
    if (num < 20) return num === 10 ? "sepuluh" : satuan[num - 10] + " belas";
    if (num < 100)
      return satuan[Math.floor(num / 10)] + " puluh " + satuan[num % 10];
    if (num < 200) return "seratus " + toWords(num - 100);
    if (num < 1000)
      return satuan[Math.floor(num / 100)] + " ratus " + toWords(num % 100);
    if (num < 2000) return "seribu " + toWords(num - 1000);
    if (num < 1000000)
      return toWords(Math.floor(num / 1000)) + " ribu " + toWords(num % 1000);
    if (num < 1000000000)
      return (
        toWords(Math.floor(num / 1000000)) + " juta " + toWords(num % 1000000)
      );
    return num;
  }

  return toWords(n).trim();
}

function cetakPDF() {
  window.print();
}
// 🗓️ Fungsi format tanggal Indonesia
function formatTanggalIndo(tanggal) {
  const options = { day: "2-digit", month: "long", year: "numeric" };
  return new Date(tanggal).toLocaleDateString("id-ID", options);
}

// 🧭 Set tanggal invoice & jatuh tempo
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  // Misalnya jatuh tempo 7 hari setelah tanggal faktur
  const jatuhTempo = new Date();
  jatuhTempo.setDate(today.getDate() + 14);

  // Tampilkan ke elemen HTML
  document.getElementById("tanggalFaktur").textContent =
    formatTanggalIndo(today);
  document.getElementById("jatuhTempo").textContent =
    formatTanggalIndo(jatuhTempo);
});
