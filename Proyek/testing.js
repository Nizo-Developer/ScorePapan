var inputString = "1;o21j4j6n288n6b";

// Menggunakan ekspresi reguler untuk menemukan angka paling belakang setelah huruf
var hasil = inputString.replace(/(\D)(\d+)$/, function(match, karakterSebelum, angka) {
  // Mengganti angka paling belakang dengan nilai yang diinginkan (misalnya, 99)
  console.log(match);
  console.log(karakterSebelum)
  console.log(angka);
  return karakterSebelum + "99";
});

console.log(hasil);
