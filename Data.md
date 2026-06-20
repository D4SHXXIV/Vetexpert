**Knowledge Base Final v1**   
**1\. Data Penyakit**

| Kode | Penyakit | Hewan |
| ----- | ----- | ----- |
| P001 | Calicivirus | Kucing |
| P002 | Panleukopenia | Kucing |
| P003 | Scabies | Kucing |
| P004 | FIV | Kucing |
| P005 | FeLV | Kucing |
| P006 | Parvovirus | Anjing |
| P007 | Distemper | Anjing |
| P008 | Demodex | Anjing |
| P009 | Rabies | Anjing |
| P010 | Pneumonia | Anjing |

**2\. Data Gejala**

| Kode | Gejala |
| ----- | ----- |
| G001 | Demam |
| G002 | Demam Tinggi |
| G003 | Muntah |
| G004 | Diare |
| G005 | Diare Berdarah |
| G006 | Tidak Nafsu Makan |
| G007 | Nafsu Makan Menurun |
| G008 | Lemas |
| G009 | Dehidrasi |
| G010 | Berat Badan Turun |
| G011 | Bersin |
| G012 | Flu |
| G013 | Hidung Berair |
| G014 | Mata Berair |
| G015 | Sariawan Mulut |
| G016 | Lesi Lidah |
| G017 | Lesi Telinga |
| G018 | Mulut Berliur |
| G019 | Gatal |
| G020 | Gatal Ekstrem |
| G021 | Kerontokan Bulu |
| G022 | Luka Kulit |
| G023 | Keropeng Kulit |
| G024 | Gusi Meradang |
| G025 | Infeksi Berulang |
| G026 | Luka Sulit Sembuh |
| G027 | Anemia (Gusi Pucat) |
| G028 | Pembengkakan Kelenjar Getah Bening |
| G029 | Kedutan Kelopak Mata |
| G030 | Kejang |
| G031 | Kulit Menebal |
| G032 | Kulit Kemerahan |
| G033 | Agresif |
| G034 | Takut Air |
| G035 | Mulut Berbusa |
| G036 | Kelumpuhan |
| G037 | Sesak Napas |
| G038 | Napas Cepat |
| G039 | Penumpukan Cairan Paru |

**3\. Relasi Penyakit-Gejala**  
P001 Calicivirus

* G001 Demam  
* G011 Bersin  
* G013 Hidung Berair  
* G015 Sariawan Mulut  
* G016 Lesi Lidah  
* G017 Lesi Telinga  
* G018 Mulut Berliur

P002 Panleukopenia

* G002 Demam Tinggi  
* G003 Muntah  
* G004 Diare  
* G006 Tidak Nafsu Makan  
* G008 Lemas  
* G009 Dehidrasi

P003 Scabies

* G019 Gatal  
* G020 Gatal Ekstrem  
* G021 Kerontokan Bulu  
* G022 Luka Kulit  
* G023 Keropeng Kulit

P004 FIV

* G024 Gusi Meradang  
* G010 Berat Badan Turun  
* G025 Infeksi Berulang  
* G026 Luka Sulit Sembuh

P005 FeLV

* G027 Anemia  
* G010 Berat Badan Turun  
* G007 Nafsu Makan Menurun  
* G028 Pembengkakan Kelenjar Getah Bening  
* G025 Infeksi Berulang

P006 Parvovirus

* G003 Muntah  
* G005 Diare Berdarah  
* G009 Dehidrasi  
* G008 Lemas  
* G006 Tidak Nafsu Makan

P007 Distemper

* G001 Demam  
* G013 Hidung Berair  
* G014 Mata Berair  
* G029 Kedutan Kelopak Mata  
* G030 Kejang

P008 Demodex

* G019 Gatal  
* G021 Kerontokan Bulu  
* G031 Kulit Menebal  
* G032 Kulit Kemerahan

P009 Rabies

* G033 Agresif  
* G034 Takut Air  
* G035 Mulut Berbusa  
* G036 Kelumpuhan

P010 Pneumonia

* G037 Sesak Napas  
* G038 Napas Cepat  
* G008 Lemas  
* G039 Penumpukan Cairan Paru

Total Relasi: 49 Relasi

**4\. Rule IF-THEN Utama**

R001

IF Demam AND Bersin AND Hidung Berair AND Sariawan Mulut  
 THEN Calicivirus

R002

IF Sariawan Mulut AND Lesi Lidah AND Mulut Berliur  
 THEN Calicivirus

R003

IF Demam Tinggi AND Muntah AND Diare AND Dehidrasi  
 THEN Panleukopenia

R004

IF Muntah AND Diare AND Tidak Nafsu Makan  
 THEN Panleukopenia

R005

IF Gatal Ekstrem AND Kerontokan Bulu AND Keropeng Kulit  
 THEN Scabies

R006

IF Gatal AND Luka Kulit AND Kerontokan Bulu  
 THEN Scabies

R007

IF Gusi Meradang AND Infeksi Berulang AND Berat Badan Turun  
 THEN FIV

R008

IF Luka Sulit Sembuh AND Infeksi Berulang  
 THEN FIV

R009

IF Anemia AND Pembengkakan Kelenjar Getah Bening  
 THEN FeLV

R010

IF Anemia AND Berat Badan Turun AND Nafsu Makan Menurun  
 THEN FeLV

R011

IF Diare Berdarah AND Dehidrasi AND Muntah  
 THEN Parvovirus

R012

IF Diare Berdarah AND Lemas  
 THEN Parvovirus

R013

IF Demam AND Mata Berair AND Hidung Berair  
 THEN Distemper

R014

IF Kedutan Kelopak Mata AND Kejang  
 THEN Distemper

R015

IF Kerontokan Bulu AND Kulit Menebal AND Kulit Kemerahan  
 THEN Demodex

R016

IF Gatal AND Kerontokan Bulu  
 THEN Demodex

R017

IF Agresif AND Takut Air AND Mulut Berbusa  
 THEN Rabies

R018

IF Takut Air AND Kelumpuhan  
 THEN Rabies

R019

IF Sesak Napas AND Napas Cepat  
 THEN Pneumonia

R020

IF Sesak Napas AND Penumpukan Cairan Paru  
 THEN Pneumonia

**5\. Dataset Final**

| Komponen | Jumlah |
| ----- | ----- |
| Penyakit | 10 |
| Gejala | 39 |
| Relasi | 49 |
| Rule IF-THEN | 20 |
| Metode | Forward Chaining \+ Certainty Factor |

**6\. Certainty Factor**

**Skala CF Pakar**

| Nilai CF | Keterangan |
| ----- | ----- |
| 1.0 | Sangat Yakin |
| 0.8–0.9 | Yakin |
| 0.6–0.7 | Cukup Yakin |
| 0.4–0.5 | Sedikit Yakin |

**P001 \- Calicivirus**

| Gejala | CF |
| ----- | ----- |
| Demam | 0.6 |
| Bersin | 0.7 |
| Hidung Berair | 0.7 |
| Sariawan Mulut | 1.0 |
| Lesi Lidah | 1.0 |
| Lesi Telinga | 0.8 |
| Mulut Berliur | 0.9 |

**P002 \- Panleukopenia**

| Gejala | CF |
| ----- | ----- |
| Demam Tinggi | 0.8 |
| Muntah | 0.8 |
| Diare | 0.7 |
| Tidak Nafsu Makan | 0.7 |
| Lemas | 0.7 |
| Dehidrasi | 0.9 |

**P003 \- Scabies**

| Gejala | CF |
| :---- | ----- |
| Gatal | 0.7 |
| Gatal Ekstrem | 1.0 |
| Kerontokan Bulu | 0.8 |
| Luka Kulit | 0.7 |
| Keropeng Kulit | 0.9 |

**P004 \- FIV**

| Gejala | CF |
| ----- | ----- |
| Gusi Meradang | 0.9 |
| Berat Badan Turun | 0.7 |
| Infeksi Berulang | 1.0 |
| Luka Sulit Sembuh | 0.8 |

**P005 \- FeLV**

| Gejala | CF |
| ----- | ----- |
| Anemia (Gusi Pucat) | 1.0 |
| Berat Badan Turun | 0.7 |
| Nafsu Makan Menurun | 0.6 |
| Pembengkakan Kelenjar Getah Bening | 0.9 |
| Infeksi Berulang | 0.8 |

**P006 \- Parvovirus**

| Gejala | CF |
| :---- | ----- |
| Muntah | 0.8 |
| Diare Berdarah | 1.0 |
| Dehidrasi | 0.9 |
| Lemas | 0.8 |
| Tidak Nafsu Makan | 0.7 |

**P007 \- Distemper**

| Gejala | CF |
| ----- | ----- |
| Demam | 0.6 |
| Hidung Berair | 0.7 |
| Mata Berair | 0.7 |
| Kedutan Kelopak Mata | 0.9 |
| Kejang | 1.0 |

**P008 \- Demodex**

| Gejala | CF |
| ----- | ----- |
| Gatal | 0.7 |
| Kerontokan Bulu | 0.9 |
| Kulit Menebal | 1.0 |
| Kulit Kemerahan | 0.8 |

**P009 \- Rabies**

| Gejala | CF |
| :---- | ----- |
| Agresif | 0.8 |
| Takut Air | 1.0 |
| Mulut Berbusa | 0.9 |
| Kelumpuhan | 0.8 |

**P010 \- Pneumonia**

| Gejala | CF |
| :---- | ----- |
| Sesak Napas | 1.0 |
| Napas Cepat | 0.9 |
| Lemas | 0.7 |
| Penumpukan Cairan Paru | 1.0 |

**Ringkasan Dataset Final**

| Komponen | Jumlah |
| :---- | ----- |
| Penyakit | 10 |
| Gejala | 39 |
| Relasi Penyakit-Gejala | 49 |
| Rule IF–THEN | 20 |
| Data CF Pakar | 49 |
| Metode Inferensi | Forward Chaining |
| Metode Perhitungan | Certainty Factor |

