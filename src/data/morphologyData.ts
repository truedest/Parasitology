import { MorphologicalFeature, VideoChapter, OspeQuestion, DifferentialItem } from '../types';

export const TAXONOMIC_INFO = {
  phylum: 'Arthropoda',
  class: 'Insecta',
  order: 'Diptera',
  suborder: 'Nematocera',
  family: 'Culicidae',
  subfamily: 'Anophelinae',
  genus: 'Anopheles Meigen, 1818',
  notableSpecies: [
    { name: 'Anopheles stephensi', roleEn: 'Urban malaria vector in South Asia & expanding in Africa', roleId: 'Vektor malaria perkotaan di Asia Selatan & meluas ke Afrika' },
    { name: 'Anopheles gambiae s.s.', roleEn: 'Primary afro-tropical vector of P. falciparum', roleId: 'Vektor utama P. falciparum di kawasan afrotropis' },
    { name: 'Anopheles sundaicus', roleEn: 'Coastal brackish water vector in Southeast Asia', roleId: 'Vektor pesisir air payau di Asia Tenggara / Indonesia' },
    { name: 'Anopheles maculatus', roleEn: 'Hilly and highland plantation malaria vector', roleId: 'Vektor malaria area perbukitan dan perkebunan' },
    { name: 'Anopheles balabacensis', roleEn: 'Forest vector associated with zoonotic P. knowlesi', roleId: 'Vektor malaria hutan zoonosis P. knowlesi' }
  ]
};

export const MORPHOLOGICAL_FEATURES: MorphologicalFeature[] = [
  {
    id: 'antenna',
    nameEn: 'Antennal Structure',
    nameId: 'Struktur Antena (Sungut)',
    maleDescEn: 'PLUMOSE (Feathery / Bushy): Dense whorls of long fibrillae/hairs on flagellomeres. Enlarged Johnston\'s organ at the base.',
    maleDescId: 'PLUMOSA (Berbulu lebat / seperti bulu unggas): Memiliki whorl rambut-rambut panjang dan lebat pada tiap segmen flagela. Organ Johnston di dasar membesar.',
    femaleDescEn: 'PILOSE (Sparse / Thread-like): Scanty whorls of short, delicate hairs. Slender flagellomeres with rich olfactory sensilla.',
    femaleDescId: 'PILOSA (Jarang / halus): Memiliki rambut-rambut pendek yang jarang dan halus. Berisi banyak sensila olfaktori untuk melacak inang.',
    medicalRelevanceEn: 'Male uses Johnston\'s organ to detect female flight tone (~350–500 Hz) for mating swarms. Female uses antennal sensilla to detect host kairomones (1-octen-3-ol, CO2, lactic acid).',
    medicalRelevanceId: 'Jantan memanfaatkan organ Johnston untuk mendeteksi frekuensi kepakan sayap betina (~350–500 Hz). Betina menggunakan sensila antena untuk melacak bau inang (CO2, asam laktat, keringat).',
    keyDiagnosticTermEn: 'Male = Plumose | Female = Pilose',
    keyDiagnosticTermId: 'Jantan = Plumosa | Betina = Pilosa',
    examTipEn: 'Under low power microscopy (4x/10x), check if the antennae resemble dense bushy bottlebrushes (male) or delicate sparse twigs (female).',
    examTipId: 'Di bawah mikroskop perbesaran rendah (4x/10x), amati apakah sungut tampak lebat menyerupai sikat botol (jantan) atau jarang ramping (betina).'
  },
  {
    id: 'palpi',
    nameEn: 'Maxillary Palpi Length & Shape',
    nameId: 'Panjang & Bentuk Palpus Maksilaris',
    maleDescEn: 'AS LONG AS PROBOSCIS, with apical 2 segments distinctly SWOLLEN / CLUBBED (Spatulate tips).',
    maleDescId: 'SAMA PANJANG DENGAN PROBOSIS, dengan 2 segmen ujung (apikal) MENGGADA / MEMBESAR (Clubbed / Spatulate).',
    femaleDescEn: 'AS LONG AS PROBOSCIS, uniformly SLENDER, straight, and non-clubbed along entire length.',
    femaleDescId: 'SAMA PANJANG DENGAN PROBOSIS, berbentuk RAMPING, lurus merata, dan TIDAK menggada sepanjang ujungnya.',
    medicalRelevanceEn: 'Crucial diagnostic discriminator in parasitology OSPE. Both sexes have long palps (unique to Anophelinae among mosquitoes), but only the male has clubbed tips.',
    medicalRelevanceId: 'Kunci diagnosis utama pada ujian OSPE parasitologi. Kedua jenis kelamin berpalpus panjang (khas Anophelinae), namun hanya jantan yang berujung menggada.',
    keyDiagnosticTermEn: 'Male: Long + Clubbed | Female: Long + Slender',
    keyDiagnosticTermId: 'Jantan: Panjang + Menggada | Betina: Panjang + Ramping',
    examTipEn: 'Differentiate from Culex/Aedes: Female Culex/Aedes has very short palps (< 1/3 proboscis). Female Anopheles has long palps matching proboscis length!',
    examTipId: 'Bedakan dengan Culex/Aedes: Betina Culex/Aedes palpusnya sangat pendek (< 1/3 probosis). Betina Anopheles palpusnya sama panjang dengan probosis!'
  },
  {
    id: 'wing',
    nameEn: 'Wing Markings & Scale Venation',
    nameId: 'Bercak Sayap & Pola Sisik (Wing Markings)',
    maleDescEn: 'SPOTTED: Alternating clusters of dark and pale scales along the Costa, Subcosta, and longitudinal veins. Narrower wing blade.',
    maleDescId: 'BERBERCAK (Spotted): Terdapat kelompok sisik gelap dan terang berselang-seling sepanjang kosta, subkosta, dan vena longitudinal.',
    femaleDescEn: 'SPOTTED: Prominent dark and pale scale patches on veins, particularly diagnostic on Costa and Vein 1 (R1). Broader wing blade.',
    femaleDescId: 'BERBERCAK (Spotted): Pola sisik gelap dan pucat yang jelas pada vena kosta dan vena 1 (R1). Bilah sayap sedikit lebih lebar.',
    medicalRelevanceEn: 'Spotted wings are the hallmark of genus Anopheles, distinguishing them from unspotted Culex and lyre-patterned Aedes. Specific pattern defines species-level malaria vectors.',
    medicalRelevanceId: 'Sayap berbercak merupakan ciri khas genus Anopheles yang membedakannya dari Culex (sayap polos) dan Aedes. Pola bercak spesifik digunakan untuk identifikasi spesies vektor malaria.',
    keyDiagnosticTermEn: 'Spotted wings (Dark & Pale Scale Tufts)',
    keyDiagnosticTermId: 'Sayap berbercak sisik gelap & terang',
    examTipEn: 'Always examine the anterior margin (Costa and Subcosta): alternating dark and pale blocks confirm genus Anopheles.',
    examTipId: 'Selalu periksa tepi anterior (Costa dan Subcosta): blok gelap dan terang berselang-seling memastikan genus Anopheles.'
  },
  {
    id: 'mouthparts',
    nameEn: 'Proboscis & Feeding Habits',
    nameId: 'Probosis & Kebiasaan Menghisap (Feeding)',
    maleDescEn: 'Non-piercing. Mandibles absent; maxillae reduced. Feeds exclusively on floral nectar, plant juices, and honeydew. CANNOT bite humans.',
    maleDescId: 'Tidak menusuk. Mandibula absen/rudimenter; maksila tereduksi. Hanya menghisap nektar bunga dan cairan tumbuhan. TIDAK DAPAT menggigit manusia.',
    femaleDescEn: 'Piercing-sucking with 6 chitinous stylets (labrum, 2 mandibles, 2 serrated maxillae, hypopharynx with salivary duct). Obligate blood-feeder for egg development.',
    femaleDescId: 'Menusuk-menghisap dengan 6 stilet kitin (labrum, 2 mandibula, 2 maksila bergigi, hipofaring berpembuluh saliva). Wajib menghisap darah untuk pematangan telur (anautogeni).',
    medicalRelevanceEn: 'ONLY FEMALE Anopheles transmits Plasmodium spp. (Malaria) and Wuchereria bancrofti (Filariasis). Males are medically harmless but essential for species propagation.',
    medicalRelevanceId: 'HANYA BETINA Anopheles yang menularkan Plasmodium spp. (Malaria) dan Wuchereria bancrofti (Filariasis). Jantan tidak menularkan penyakit.',
    keyDiagnosticTermEn: 'Female = Hematophagous Vector | Male = Nectarivore',
    keyDiagnosticTermId: 'Betina = Vektor Hematofag | Jantan = Nektarivor',
    examTipEn: 'Classic exam question: "Can male Anopheles transmit malaria?" Answer is NO, because mouthparts lack piercing mandibles and they never take blood meals.',
    examTipId: 'Pertanyaan klasik ujian: "Apakah Anopheles jantan dapat menularkan malaria?" Jawabannya TIDAK, karena stilet tidak berkembang dan tidak menghisap darah.'
  },
  {
    id: 'posture',
    nameEn: 'Resting Angle & Body Axis',
    nameId: 'Sudut Istirahat & Sumbu Tubuh (Resting Posture)',
    maleDescEn: 'Rests at an acute angle (~45° to 60°) with proboscis, head, thorax, and abdomen in a straight continuous line.',
    maleDescId: 'Bertengger membentuk sudut miring (~45° hingga 60°) dengan probosis, kepala, toraks, dan abdomen dalam satu garis lurus.',
    femaleDescEn: 'Rests at steep angle (45° to 90°) to the resting surface. Straight line axis without hunchback curvature.',
    femaleDescId: 'Bertengger membentuk sudut curam (45° hingga 90°) terhadap permukaan. Sumbu tubuh lurus tanpa lekukan punggung bungkuk.',
    medicalRelevanceEn: 'Field identification key. While Culex sits parallel or hump-backed, Anopheles points its abdomen away from the wall or skin like a dart.',
    medicalRelevanceId: 'Kunci identifikasi lapangan yang cepat. Culex bertengger sejajar permukaan dengan punggung membungkuk, sedangkan Anopheles menungging membentuk sudut lancip.',
    keyDiagnosticTermEn: '45°–90° Angle, Straight Linear Axis',
    keyDiagnosticTermId: 'Sudut 45°–90°, Sumbu Tubuh Segaris',
    examTipEn: 'Remember: Anopheles "angles" its body at 45°. Culex is "curved/couch-potato" parallel.',
    examTipId: 'Jembatan keledai: Anopheles menungging tajam (sudut 45°). Culex sejajar dan bungkuk.'
  },
  {
    id: 'terminalia',
    nameEn: 'Abdominal Tip & Genitalia',
    nameId: 'Ujung Abdomen & Alat Kelamin (Terminalia)',
    maleDescEn: 'Possesses prominent external paired claspers (gonocoxites and curved gonostyli) forming the hypopygium for grasping the female in flight.',
    maleDescId: 'Memiliki sepasang penjepit (claspers / gonocoxite & gonostylus) yang mencolok pada hipopigium untuk mencengkeram betina saat kawin di udara.',
    femaleDescEn: 'Posterior abdomen ends bluntly with delicate short cerci and postgenital plate for egg deposition.',
    femaleDescId: 'Ujung abdomen tumpul membulat dengan sepasang cerci pendek dan lempeng postgenital untuk meletakkan telur (ovipositor sederhana).',
    medicalRelevanceEn: 'Used by research entomologists to dissect male hypopygium for cryptic sibling species complexes (e.g., Anopheles gambiae complex).',
    medicalRelevanceId: 'Digunakan oleh entomolog medis untuk diseksi genitalia (hipopigium) guna membedakan kompleks spesies kembar (cryptic sibling species).',
    keyDiagnosticTermEn: 'Male: Hypopygium with claspers | Female: Blunt tip with cerci',
    keyDiagnosticTermId: 'Jantan: Hipopigium bercapit | Betina: Ujung tumpul ber-cerci',
    examTipEn: 'If a slide shows a pair of pincers at the posterior abdomen, it is definitely a male specimen.',
    examTipId: 'Bila preparat mikroskop memperlihatkan sepasang capit di ujung belakang abdomen, spesimen tersebut dipastikan jantan.'
  }
];

export const DIFFERENTIAL_TABLE: DifferentialItem[] = [
  {
    featureEn: 'Antenna (Sungut)',
    featureId: 'Antena (Sungut)',
    anophelesMaleEn: 'Plumose (Bushy)',
    anophelesMaleId: 'Plumosa (Lebat)',
    anophelesFemaleEn: 'Pilose (Sparse)',
    anophelesFemaleId: 'Pilosa (Jarang)',
    culexFemaleEn: 'Pilose (Sparse)',
    culexFemaleId: 'Pilosa (Jarang)',
    aedesFemaleEn: 'Pilose (Sparse)',
    aedesFemaleId: 'Pilosa (Jarang)'
  },
  {
    featureEn: 'Palpi Length vs Proboscis',
    featureId: 'Panjang Palpus vs Probosis',
    anophelesMaleEn: 'Equal (Apices clubbed)',
    anophelesMaleId: 'Sama panjang (Ujung menggada)',
    anophelesFemaleEn: 'Equal (Slender, straight)',
    anophelesFemaleId: 'Sama panjang (Ramping, lurus)',
    culexFemaleEn: 'Very Short (< 1/3 length)',
    culexFemaleId: 'Sangat pendek (< 1/3 panjang)',
    aedesFemaleEn: 'Very Short (< 1/3 length)',
    aedesFemaleId: 'Sangat pendek (< 1/3 panjang)'
  },
  {
    featureEn: 'Wing Markings',
    featureId: 'Bercak Sayap (Wing Markings)',
    anophelesMaleEn: 'Spotted (Dark & Pale scales)',
    anophelesMaleId: 'Berbercak (Sisik gelap & terang)',
    anophelesFemaleEn: 'Spotted (Dark & Pale scales)',
    anophelesFemaleId: 'Berbercak (Sisik gelap & terang)',
    culexFemaleEn: 'Unspotted (Uniform brown/grey)',
    culexFemaleId: 'Polos (Cokelat/abu-abu seragam)',
    aedesFemaleEn: 'Unspotted, narrow dark scales',
    aedesFemaleId: 'Polos, sisik gelap ramping'
  },
  {
    featureEn: 'Resting Posture',
    featureId: 'Sikap Istirahat',
    anophelesMaleEn: 'At angle (~45°), straight axis',
    anophelesMaleId: 'Membentuk sudut 45°, lurus',
    anophelesFemaleEn: 'At angle (45°–90°), straight axis',
    anophelesFemaleId: 'Menungging 45°–90°, lurus',
    culexFemaleEn: 'Parallel, hump-backed',
    culexFemaleId: 'Sejajar permukaan, bungkuk',
    aedesFemaleEn: 'Slight angle or parallel, bent',
    aedesFemaleId: 'Agak sejajar / sedikit membungkuk'
  },
  {
    featureEn: 'Disease Transmission',
    featureId: 'Penyakit yang Ditularkan',
    anophelesMaleEn: 'None (Does not bite)',
    anophelesMaleId: 'Tidak ada (Tidak menggigit)',
    anophelesFemaleEn: 'Malaria, Filariasis (Wuchereria)',
    anophelesFemaleId: 'Malaria, Filariasis (Wuchereria)',
    culexFemaleEn: 'Japanese Encephalitis, Filariasis',
    culexFemaleId: 'Japanese Encephalitis, Filariasis',
    aedesFemaleEn: 'Dengue, Chikungunya, Zika',
    aedesFemaleId: 'DHF (Dengue), Chikungunya, Zika'
  }
];

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 1,
    timeStart: 0,
    duration: 15,
    titleEn: '1. Introduction & Taxonomic Foundations',
    titleId: '1. Pendahuluan & Taksonomi Dasar',
    subtitleEn: 'Medical Parasitology Lecture: Genus Anopheles',
    subtitleId: 'Kuliah Parasitologi Kedokteran: Genus Anopheles',
    narrationEn: 'Welcome to this parasitology clinical lecture module. Today we examine the crucial morphological differences between male and female Anopheles mosquitoes. As future physicians and parasitologists, sexual differentiation is critical because only the female Anopheles is hematophagous and transmits Plasmodium species responsible for human malaria.',
    narrationId: 'Selamat datang dalam modul kuliah parasitologi kedokteran. Hari ini kita membedah perbedaan morfologi krusial antara nyamuk Anopheles jantan dan betina. Sebagai calon dokter, pembedaan jenis kelamin ini sangat vital karena hanya Anopheles betina yang menghisap darah dan menjadi vektor penular malaria.',
    highlightPart: 'all',
    focusSex: 'both',
    keyTakeawayEn: 'Only female Anopheles requires blood meals and transmits malaria parasites.',
    keyTakeawayId: 'Hanya Anopheles betina yang membutuhkan darah dan menularkan parasit malaria.'
  },
  {
    id: 2,
    timeStart: 15,
    duration: 18,
    titleEn: '2. Antennal Structure: Plumose vs Pilose',
    titleId: '2. Struktur Antena: Plumosa vs Pilosa',
    subtitleEn: 'High-yield microscopic discriminator',
    subtitleId: 'Pembeda mikroskopis utama dalam ujian OSPE',
    narrationEn: 'Look closely at the antennae. The male Anopheles possesses plumose antennae, characterized by dense, bushy whorls of long fibrillae resembling a feather or bottle-brush. This acts as an acoustic receiver to detect female wing-beat frequencies. In contrast, the female possesses pilose antennae with sparse, delicate short hairs specialized in olfactory host-seeking.',
    narrationId: 'Perhatikan dengan seksama bagian antena. Anopheles jantan memiliki antena tipe plumosa, ditandai dengan rambut-rambut panjang yang sangat lebat menyerupai bulu unggas atau sikat botol. Sebaliknya, betina memiliki antena tipe pilosa dengan rambut pendek dan jarang untuk mencium aroma inang.',
    highlightPart: 'antenna',
    focusSex: 'both',
    keyTakeawayEn: 'Male = Plumose (Bushy/Feather-like) | Female = Pilose (Sparse hairs)',
    keyTakeawayId: 'Jantan = Plumosa (Lebat seperti bulu) | Betina = Pilosa (Rambut jarang)'
  },
  {
    id: 3,
    timeStart: 33,
    duration: 20,
    titleEn: '3. Maxillary Palpi Length & The Clubbed Tip Rule',
    titleId: '3. Panjang Palpus Maksilaris & Hukum Ujung Menggada',
    subtitleEn: 'The hallmark of Anopheline mosquitoes',
    subtitleId: 'Ciri khas pembeda subfamili Anophelinae',
    narrationEn: 'Now examine the maxillary palps relative to the central proboscis. Unlike Culex or Aedes where female palps are tiny, both male and female Anopheles possess maxillary palpi that are equal in length to the proboscis! However, observe the apical segments: in the male, the tips are distinctly clubbed or swollen. In the female, the palpi are slender and straight without any apical expansion.',
    narrationId: 'Sekarang perhatikan palpus maksilaris terhadap probosis di tengah. Berbeda dengan Culex atau Aedes, pada Anopheles baik jantan maupun betina memiliki palpus yang sama panjang dengan probosis. Namun perhatikan ujungnya: pada jantan ujungnya menggada atau membesar, sedangkan pada betina ramping lurus merata.',
    highlightPart: 'palpi',
    focusSex: 'both',
    keyTakeawayEn: 'Both sexes have palpi as long as proboscis. Male palpi have CLUBBED apices; female palpi are SLENDER.',
    keyTakeawayId: 'Keduanya berpalpus sama panjang probosis. Jantan berujung MENGGADA; betina RAMPING lurus.'
  },
  {
    id: 4,
    timeStart: 53,
    duration: 18,
    titleEn: '4. Wing Markings & Scale Venation',
    titleId: '4. Pola Bercak Sisik & Venasi Sayap',
    subtitleEn: 'Genus Anopheles spotted wing hallmark',
    subtitleId: 'Tanda khas sayap berbercak genus Anopheles',
    narrationEn: 'Next, let us analyze the wings. The genus Anopheles is distinguished by spotted wings, formed by alternating clusters of dark and pale scales along the wing veins, particularly on the Costa and Subcosta. While present in both sexes, these specific scale patterns are essential for entomological species identification such as Anopheles stephensi and Anopheles sundaicus.',
    narrationId: 'Selanjutnya, mari kita amati sayapnya. Genus Anopheles dicirikan oleh sayap berbercak (spotted wings), yang terbentuk dari kelompok sisik gelap dan terang yang berselang-seling sepanjang vena sayap, khususnya vena kosta. Pola bercak sisik ini penting untuk identifikasi spesies vektor.',
    highlightPart: 'wing',
    focusSex: 'both',
    keyTakeawayEn: 'Wings have distinct dark and pale spotted scale clusters along veins, unlike Culex unspotted wings.',
    keyTakeawayId: 'Sayap memiliki bercak sisik gelap dan terang pada vena, tidak polos seperti Culex.'
  },
  {
    id: 5,
    timeStart: 71,
    duration: 18,
    titleEn: '5. Mouthparts, Blood Feeding & Vector Status',
    titleId: '5. Alat Mulut, Kebiasaan Menghisap Darah & Vektor',
    subtitleEn: 'Pathophysiology of malaria transmission',
    subtitleId: 'Patofisiologi penularan parasit malaria',
    narrationEn: 'Regarding mouthparts and clinical significance: The female possesses six rigid piercing stylets including sharp mandibles and serrated maxillae. She requires a blood meal to provide essential amino acids for vitellogenesis. During feeding, infective Plasmodium sporozoites in her salivary glands are inoculated into the human host. Male Anopheles lack piercing stylets, feed solely on plant nectar, and never transmit disease.',
    narrationId: 'Tinjauan klinis alat mulut: Betina memiliki enam stilet penusuk termasuk mandibula tajam dan maksila bergigi. Betina wajib menghisap darah untuk mematangkan telur. Saat menggigit, sporozoit Plasmodium dalam ludahnya masuk ke darah manusia. Jantan tidak memiliki stilet menusuk dan hanya menghisap nektar tanaman.',
    highlightPart: 'mouthparts',
    focusSex: 'female',
    keyTakeawayEn: 'Female is the sole disease vector; males feed on nectar and lack piercing mouthparts.',
    keyTakeawayId: 'Hanya betina yang menjadi vektor penyakit; jantan pemakan nektar dan tidak menusuk.'
  },
  {
    id: 6,
    timeStart: 89,
    duration: 16,
    titleEn: '6. Resting Posture & OSPE Exam Summary',
    titleId: '6. Sikap Bertengger & Rangkuman Ujian OSPE',
    subtitleEn: 'High-yield mnemonic & differential table',
    subtitleId: 'Jembatan keledai praktis & tabel diferensial',
    narrationEn: 'Finally, remember the resting posture: Anopheles perches at an acute 45 to 90 degree angle with its proboscis and abdomen aligned in a straight line. Remember the parasitology mnemonic: M-P-C for Male Plumose Clubbed, and F-P-S for Female Pilose Slender. Master these key points to ace your medical parasitology practical examination.',
    narrationId: 'Terakhir, ingat sikap bertengger: Anopheles menungging membentuk sudut 45 hingga 90 derajat dengan tubuh segaris lurus. Ingat jembatan keledai: M-P-C untuk Male Plumose Clubbed, dan F-P-S untuk Female Pilose Slender. Kuasai ciri ini untuk menembus ujian praktikum parasitologi.',
    highlightPart: 'posture',
    focusSex: 'both',
    keyTakeawayEn: 'Mnemonic: MPC (Male Plumose Clubbed) vs FPS (Female Pilose Slender). 45° resting angle.',
    keyTakeawayId: 'Mnemonic: MPC (Male Plumose Clubbed) vs FPS (Female Pilose Slender). Sudut istirahat 45°.'
  }
];

export const OSPE_QUESTIONS: OspeQuestion[] = [
  {
    id: 1,
    specimenType: 'head_male',
    questionEn: 'Under the microscope at Station 1, you observe an adult mosquito head with very bushy antennae and maxillary palps that are as long as the proboscis with swollen, clubbed tips. What is the sex and genus of this specimen?',
    questionId: 'Pada mikroskop Stasiun 1, Anda mengamati kepala nyamuk dewasa dengan antena sangat lebat (berbulu lebat) dan palpus maksilaris sama panjang dengan probosis dengan ujung menggada membesar. Apa jenis kelamin dan genus spesimen ini?',
    options: [
      { id: 'a', textEn: 'Male Anopheles', textId: 'Anopheles Jantan', isCorrect: true },
      { id: 'b', textEn: 'Female Anopheles', textId: 'Anopheles Betina', isCorrect: false },
      { id: 'c', textEn: 'Male Culex', textId: 'Culex Jantan', isCorrect: false },
      { id: 'd', textEn: 'Female Aedes', textId: 'Aedes Betina', isCorrect: false }
    ],
    explanationEn: 'The combination of plumose (bushy) antennae and maxillary palpi equal to proboscis length with clubbed (spatulate) apices is diagnostic for MALE Anopheles.',
    explanationId: 'Kombinasi antena plumosa (lebat) dan palpus maksilaris sama panjang probosis dengan ujung menggada (clubbed) merupakan ciri khas diagnostik ANOPHELES JANTAN.',
    clinicalSignificanceEn: 'Male mosquitoes do not bite humans and do not transmit malaria.',
    clinicalSignificanceId: 'Nyamuk jantan tidak menggigit manusia dan tidak menularkan malaria.'
  },
  {
    id: 2,
    specimenType: 'head_female',
    questionEn: 'A parasitology student examines a mosquito specimen with sparse (pilose) antennae and maxillary palps that are equal in length to the proboscis and slender throughout. Can this specimen transmit human malaria?',
    questionId: 'Seorang mahasiswa parasitologi memeriksa spesimen nyamuk dengan antena berambut jarang (pilosa) dan palpus maksilaris yang sama panjang dengan probosis serta berbentuk ramping lurus. Apakah spesimen ini dapat menularkan malaria pada manusia?',
    options: [
      { id: 'a', textEn: 'Yes, this is a female Anopheles and the biological vector for Plasmodium spp.', textId: 'Ya, ini adalah Anopheles betina yang merupakan vektor biologis Plasmodium spp.', isCorrect: true },
      { id: 'b', textEn: 'No, this is a male mosquito which feeds exclusively on floral nectar.', textId: 'Tidak, ini adalah nyamuk jantan yang hanya menghisap nektar bunga.', isCorrect: false },
      { id: 'c', textEn: 'No, because only mosquitoes with short palps transmit malaria.', textId: 'Tidak, karena hanya nyamuk berpalpus pendek yang menularkan malaria.', isCorrect: false },
      { id: 'd', textEn: 'No, this is a female Culex transmitting only filariasis.', textId: 'Tidak, ini adalah Culex betina yang hanya menularkan filariasis.', isCorrect: false }
    ],
    explanationEn: 'Pilose antennae + palpi equal to proboscis length and slender = FEMALE Anopheles. Female Anopheles is anautogenous (requires blood meal for egg vitellogenesis) and acts as the definitive host and vector for Plasmodium.',
    explanationId: 'Antena pilosa + palpus sama panjang probosis dan ramping = ANOPHELES BETINA. Anopheles betina membutuhkan darah untuk pematangan telur dan bertindak sebagai inang definitif sekaligus vektor Plasmodium.',
    clinicalSignificanceEn: 'Injects sporozoites during capillary puncture while releasing salivary anticoagulants.',
    clinicalSignificanceId: 'Menginjeksikan sporozoit saat menusuk kapiler darah bersama sekresi saliva berantikoagulan.'
  },
  {
    id: 3,
    specimenType: 'wing',
    questionEn: 'Which diagnostic feature of the wing distinguishes the genus Anopheles from the genus Culex in medical entomology?',
    questionId: 'Ciri diagnostik sayap manakah yang membedakan genus Anopheles dari genus Culex dalam entomologi kedokteran?',
    options: [
      { id: 'a', textEn: 'Anopheles wings have clusters of dark and pale scales creating spotted markings along veins', textId: 'Sayap Anopheles memiliki kelompok sisik gelap dan terang yang membentuk pola bercak sepanjang vena', isCorrect: true },
      { id: 'b', textEn: 'Anopheles wings lack scales entirely and are completely transparent', textId: 'Sayap Anopheles tidak memiliki sisik sama sekali dan sepenuhnya transparan', isCorrect: false },
      { id: 'c', textEn: 'Anopheles wings have a distinct white lyre shape on the wing margin', textId: 'Sayap Anopheles memiliki pola gambus/lira putih pada tepi sayap', isCorrect: false },
      { id: 'd', textEn: 'Anopheles wings have only 2 longitudinal veins compared to 6 in Culex', textId: 'Sayap Anopheles hanya memiliki 2 vena longitudinal dibandingkan 6 pada Culex', isCorrect: false }
    ],
    explanationEn: 'Anopheline wings feature characteristic spots (clusters of contrasting dark and light scales) along the Costa, Subcosta, and longitudinal veins. Culex wings have uniform unspotted brownish scales.',
    explanationId: 'Sayap Anopheles memiliki ciri khas bercak (kelompok sisik gelap dan terang yang kontras) di sepanjang Costa, Subcosta, dan vena-vena longitudinal. Sayap Culex berwarna kecokelatan polos tanpa bercak.',
    clinicalSignificanceEn: 'Specific wing spot patterns on Costa and vein 1 (R1) are utilized in entomological keys to identify vector species.',
    clinicalSignificanceId: 'Pola bercak sisik spesifik pada Costa dan vena 1 (R1) digunakan pada kunci identifikasi spesies vektor malaria.'
  },
  {
    id: 4,
    specimenType: 'resting_angle',
    questionEn: 'A vector surveillance team observes a mosquito resting on an indoor bedroom wall with its proboscis, thorax, and abdomen in a straight line tilted at a 45° angle to the surface. What is the most likely identification?',
    questionId: 'Tim surveilans vektor mengamati seekor nyamuk bertengger di dinding kamar tidur dengan probosis, toraks, dan abdomen dalam satu garis lurus membentuk sudut miring 45° terhadap dinding. Manakah identifikasi yang paling tepat?',
    options: [
      { id: 'a', textEn: 'Anopheles species (characteristic straight-line angled posture)', textId: 'Spesies Anopheles (postur khas miring segaris 45°)', isCorrect: true },
      { id: 'b', textEn: 'Culex quinquefasciatus (rests parallel with hump-backed curvature)', textId: 'Culex quinquefasciatus (bertengger sejajar dengan punggung bungkuk)', isCorrect: false },
      { id: 'c', textEn: 'Aedes aegypti (hangs downward vertically)', textId: 'Aedes aegypti (menggantung tegak lurus)', isCorrect: false },
      { id: 'd', textEn: 'Mansonia uniformis (abdominal tip curled inward)', textId: 'Mansonia uniformis (ujung abdomen melengkung ke dalam)', isCorrect: false }
    ],
    explanationEn: 'Anopheles mosquitoes uniquely rest with their body in a straight axis forming an angle of 45° to 90° with the substrate. Culicine mosquitoes (Culex, Aedes) rest parallel to the surface with a bent or hump-backed profile.',
    explanationId: 'Nyamuk Anopheles secara khas bertengger dengan sumbu tubuh lurus membentuk sudut 45° hingga 90° terhadap bidang hinggap. Nyamuk Culicine (Culex, Aedes) bertengger sejajar permukaan dengan postur melengkung bungkuk.',
    clinicalSignificanceEn: 'Rapid field identification during indoor residual spraying (IRS) evaluations and larval habitat surveys.',
    clinicalSignificanceId: 'Membantu identifikasi lapangan cepat saat surveilans IRS (Indoor Residual Spraying).'
  },
  {
    id: 5,
    specimenType: 'differential',
    questionEn: 'What anatomical difference explains why male Anopheles mosquitoes cannot take a blood meal from humans?',
    questionId: 'Perbedaan anatomis apakah yang menjelaskan mengapa nyamuk Anopheles jantan tidak dapat menghisap darah manusia?',
    options: [
      { id: 'a', textEn: 'Mandibles are absent/atrophied and maxillae lack serrated cutting teeth', textId: 'Mandibula absen/atrofi dan maksila tidak memiliki gigi pemotong bergerigi', isCorrect: true },
      { id: 'b', textEn: 'Males lack a salivary gland entirely', textId: 'Jantan sama sekali tidak memiliki kelenjar ludah', isCorrect: false },
      { id: 'c', textEn: 'Male proboscis is coiled like a butterfly tongue', textId: 'Probosis jantan menggulung seperti lidah kupu-kupu', isCorrect: false },
      { id: 'd', textEn: 'Males possess an exoskeleton impenetrable to hemoglobin', textId: 'Jantan memiliki eksoskeleton yang tidak dapat menerima hemoglobin', isCorrect: false }
    ],
    explanationEn: 'Blood feeding requires six specialized piercing stylets. In male mosquitoes, the mandibles are absent or vestigial and maxillae are poorly developed, rendering them physically incapable of piercing skin.',
    explanationId: 'Menghisap darah memerlukan 6 stilet penusuk khusus. Pada nyamuk jantan, mandibula absen atau vestigial dan maksila tidak berkembang, sehingga secara fisik tidak dapat menusuk kulit mamalia.',
    clinicalSignificanceEn: 'Explains sexual dimorphism in disease transmission; sterile insect technique (SIT) releases non-biting males.',
    clinicalSignificanceId: 'Mendasari teknik serangga mandul (SIT) di mana hanya jantan yang dilepaskan karena aman tidak menggigit.'
  },
  {
    id: 6,
    specimenType: 'differential',
    questionEn: 'Which memory mnemonic is recommended for medical students to quickly recall the head morphology of male vs female Anopheles?',
    questionId: 'Jembatan keledai (mnemonik) manakah yang paling tepat bagi mahasiswa kedokteran untuk mengingat morfologi kepala Anopheles jantan vs betina?',
    options: [
      { id: 'a', textEn: 'MPC (Male Plumose Clubbed) vs FPS (Female Pilose Slender)', textId: 'MPC (Male Plumose Clubbed) vs FPS (Female Pilose Slender)', isCorrect: true },
      { id: 'b', textEn: 'MPS (Male Pilose Short) vs FPC (Female Plumose Curved)', textId: 'MPS (Male Pilose Short) vs FPC (Female Plumose Curved)', isCorrect: false },
      { id: 'c', textEn: 'ABC (Anopheles Bushy Claws) vs DEF (Dengue Entomological Female)', textId: 'ABC (Anopheles Bushy Claws) vs DEF (Dengue Entomological Female)', isCorrect: false },
      { id: 'd', textEn: 'MAL (Male Always Long) vs FEM (Female Extra Minute)', textId: 'MAL (Male Always Long) vs FEM (Female Extra Minute)', isCorrect: false }
    ],
    explanationEn: 'M-P-C = Male Plumose Clubbed (palpi equal length, tips clubbed). F-P-S = Female Pilose Slender (palpi equal length, tips slender and straight).',
    explanationId: 'M-P-C = Male Plumose Clubbed (palpus sama panjang, ujung menggada). F-P-S = Female Pilose Slender (palpus sama panjang, ujung ramping lurus).',
    clinicalSignificanceEn: 'Gold standard clinical recall for parasitology laboratory practical exams.',
    clinicalSignificanceId: 'Mnemonic standar emas untuk menjawab stasiun praktikum mikroskop parasitologi.'
  }
];
