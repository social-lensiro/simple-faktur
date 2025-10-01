let daftarProduk = [];

// Fungsi tambah produk
function tambahProduk() {
    const produk = document.getElementById("produk").value;
    const jumlah = parseInt(document.getElementById("jumlah").value);
    const harga = parseInt(document.getElementById("harga").value);

    if (produk && jumlah > 0 && harga >= 0) {
        daftarProduk.push({ produk, jumlah, harga });
        tampilkanProduk();
        document.getElementById("produk").value = "";
        document.getElementById("jumlah").value = 1;
        document.getElementById("harga").value = 0;
    } else {
        alert("Lengkapi data produk dengan benar!");
    }
}

// Menampilkan produk di daftar
function tampilkanProduk() {
    const produkList = document.getElementById("produkList");
    produkList.innerHTML = "";

    daftarProduk.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.produk} - ${item.jumlah} x Rp${item.harga} = Rp${item.jumlah * item.harga}`;

        const hapusBtn = document.createElement("button");
        hapusBtn.textContent = "Hapus";
        hapusBtn.style.marginLeft = "10px";
        hapusBtn.style.color = "red"
        hapusBtn.onclick = () => {
            daftarProduk.splice(index, 1);
            tampilkanProduk();
        };

        li.appendChild(hapusBtn);
        produkList.appendChild(li);
    });
}

// Saat form disubmit
document.getElementById("fakturForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nomor = document.getElementById("nomor").value;
    const tanggal = document.getElementById("tanggal").value;
    const pelanggan = document.getElementById("pelanggan").value;
    const alamat = document.getElementById("alamat").value;
    const telp = document.getElementById("telp").value;

    if (daftarProduk.length === 0) {
        alert("Tambahkan minimal 1 produk!");
        return;
    }

    // Buat objek data faktur
    const fakturData = {
        nomor,
        tanggal,
        pelanggan,
        alamat,
        telp,
        produk: daftarProduk
    };
    // Simpan ke localStorage
    localStorage.setItem("fakturData", JSON.stringify(fakturData));

    // Redirect ke halaman faktur
    window.location.href = "faktur.html";
});
