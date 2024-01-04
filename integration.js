let Integration = {
    countyData: [
        "臺北市",
        "嘉義市",
        "新竹市",
        "基隆市",
        "新北市",
        "桃園市",
        "臺中市",
        "彰化縣",
        "金門縣",
        "高雄市",
        "澎湖縣",
        "臺南市",
        "雲林縣",
        "連江縣",
        "新竹縣",
        "苗栗縣",
        "屏東縣",
        "嘉義縣",
        "宜蘭縣",
        "南投縣",
        "花蓮縣",
        "臺東縣"
    ],
    populationData: [
        { year: 103, county: '新北市', value: 1.9326197528939473 },
        { year: 103, county: '臺北市', value: 9.942657934434674 },
        { year: 103, county: '臺中市', value: 1.2279774616346635 },
        { year: 103, county: '臺南市', value: 0.8597558916797845 },
        { year: 103, county: '高雄市', value: 0.9414407913681251 },
        { year: 103, county: '宜蘭縣', value: 0.21401974230507273 },
        { year: 103, county: '桃園市', value: 1.7347361714508912 },
        { year: 103, county: '新竹縣', value: 0.37661555273794595 },
        { year: 103, county: '苗栗縣', value: 0.31155792145293937 },
        { year: 103, county: '彰化縣', value: 1.2020532581278678 },
        { year: 103, county: '南投縣', value: 0.12524626013349793 },
        { year: 103, county: '雲林縣', value: 0.5464360140374798 },
        { year: 103, county: '嘉義縣', value: 0.2756748948062386 },
        { year: 103, county: '屏東縣', value: 0.30548962386511025 },
        { year: 103, county: '臺東縣', value: 0.06385605575705852 },
        { year: 103, county: '花蓮縣', value: 0.07202915803369075 },
        { year: 103, county: '澎湖縣', value: 0.802128330443008 },
        { year: 103, county: '基隆市', value: 2.8103728813559323 },
        { year: 103, county: '新竹市', value: 4.14774843975036 },
        { year: 103, county: '嘉義市', value: 4.51321226257914 },
        { year: 103, county: '金門縣', value: 0.8422222222222222 },
        { year: 103, county: '連江縣', value: 0.4342361111111111 },
        { year: 104, county: '新北市', value: 1.9344837666133998 },
        { year: 104, county: '臺北市', value: 9.95183781596085 },
        { year: 104, county: '桃園市', value: 1.7247061714238912 },
        { year: 104, county: '臺中市', value: 1.2390886229112958 },
        { year: 104, county: '臺南市', value: 0.8603294321629822 },
        { year: 104, county: '高雄市', value: 0.941415722343615 },
        { year: 104, county: '宜蘭縣', value: 0.21371185191405195 },
        { year: 104, county: '新竹縣', value: 0.37970620582404574 },
        { year: 104, county: '苗栗縣', value: 0.3097889919848817 },
        { year: 104, county: '彰化縣', value: 1.199817570900697 },
        { year: 104, county: '南投縣', value: 0.12407127358800708 },
        { year: 104, county: '雲林縣', value: 0.5420024325434024 },
        { year: 104, county: '嘉義縣', value: 0.2730777514538014 },
        { year: 104, county: '屏東縣', value: 0.30308870154200895 },
        { year: 104, county: '臺東縣', value: 0.06328198563402318 },
        { year: 104, county: '花蓮縣', value: 0.07171653448041188 },
        { year: 104, county: '澎湖縣', value: 0.806432287561091 },
        { year: 104, county: '基隆市', value: 2.8030508474576274 },
        { year: 104, county: '新竹市', value: 4.167642822851656 },
        { year: 104, county: '嘉義市', value: 4.5045984671776065 },
        { year: 104, county: '金門縣', value: 0.875694032311243 },
        { year: 104, county: '連江縣', value: 0.4356597222222222 },
        { year: 105, county: '新北市', value: 1.9386561172389603 },
        { year: 105, county: '臺北市', value: 9.918334007873726 },
        { year: 105, county: '桃園市', value: 1.759091690896433 },
        { year: 105, county: '臺中市', value: 1.249379878910465 },
        { year: 105, county: '臺南市', value: 0.8605539205621335 },
        { year: 105, county: '高雄市', value: 0.9415691854260888 },
        { year: 105, county: '宜蘭縣', value: 0.21344174807102007 },
        { year: 105, county: '新竹縣', value: 0.3835162833705772 },
        { year: 105, county: '苗栗縣', value: 0.30719437897940466 },
        { year: 105, county: '彰化縣', value: 1.1980249257718334 },
        { year: 105, county: '南投縣', value: 0.12301756026524255 },
        { year: 105, county: '雲林縣', value: 0.5383148826723891 },
        { year: 105, county: '嘉義縣', value: 0.27070386577223515 },
        { year: 105, county: '屏東縣', value: 0.3011211990200317 },
        { year: 105, county: '臺東縣', value: 0.06281260223312708 },
        { year: 105, county: '花蓮縣', value: 0.07149313934973438 },
        { year: 105, county: '澎湖縣', value: 0.8139918019864417 },
        { year: 105, county: '基隆市', value: 2.8030131826741993 },
        { year: 105, county: '新竹市', value: 4.19910705712914 },
        { year: 105, county: '嘉義市', value: 4.4964011996001325 },
        { year: 105, county: '金門縣', value: 0.8909594460929773 },
        { year: 105, county: '連江縣', value: 0.43732638888888886 },
        { year: 106, county: '新北市', value: 1.942300834080368 },
        { year: 106, county: '臺北市', value: 9.872537620957356 },
        { year: 106, county: '桃園市', value: 1.7920610999631432 },
        { year: 106, county: '臺中市', value: 1.2583333709574742 },
        { year: 106, county: '臺南市', value: 0.8607770401295827 },
        { year: 106, county: '高雄市', value: 0.9407361485170317 },
        { year: 106, county: '宜蘭縣', value: 0.21300743601944375 },
        { year: 106, county: '新竹縣', value: 0.3868002774022262 },
        { year: 106, county: '苗栗縣', value: 0.3042377397256511 },
        { year: 106, county: '彰化縣', value: 1.1936615195599363 },
        { year: 106, county: '南投縣', value: 0.12201620385590402 },
        { year: 106, county: '雲林縣', value: 0.5348287535926497 },
        { year: 106, county: '嘉義縣', value: 0.2685301240262025 },
        { year: 106, county: '屏東縣', value: 0.2990124657731662 },
        { year: 106, county: '臺東縣', value: 0.06245359505013868 },
        { year: 106, county: '花蓮縣', value: 0.07113147257144216 },
        { year: 106, county: '澎湖縣', value: 0.8203767933154659 },
        { year: 106, county: '基隆市', value: 2.798177024482109 },
        { year: 106, county: '新竹市', value: 4.235544887181949 },
        { year: 106, county: '嘉義市', value: 4.488470509830057 },
        { year: 106, county: '金門縣', value: 0.9064029014177383 },
        { year: 106, county: '連江縣', value: 0.44722222222222224 },
        { year: 107, county: '新北市', value: 1.9466992438710684 },
        { year: 107, county: '臺北市', value: 9.818506935501674 },
        { year: 107, county: '桃園市', value: 1.8189704738113763 },
        { year: 107, county: '臺中市', value: 1.2659292335059529 },
        { year: 107, county: '臺南市', value: 0.8595491980927611 },
        { year: 107, county: '高雄市', value: 0.9395914426546065 },
        { year: 107, county: '宜蘭縣', value: 0.21236086619830008 },
        { year: 107, county: '新竹縣', value: 0.3901914495667341 },
        { year: 107, county: '苗栗縣', value: 0.30152171882811174 },
        { year: 107, county: '彰化縣', value: 1.1893483744264186 },
        { year: 107, county: '南投縣', value: 0.12103725133510129 },
        { year: 107, county: '雲林縣', value: 0.5314580541202173 },
        { year: 107, county: '嘉義縣', value: 0.2663689897721721 },
        { year: 107, county: '屏東縣', value: 0.29737930537541435 },
        { year: 107, county: '臺東縣', value: 0.062276936206528695 },
        { year: 107, county: '花蓮縣', value: 0.07085730582015613 },
        { year: 107, county: '澎湖縣', value: 0.8232697461768879 },
        { year: 107, county: '基隆市', value: 2.788361581920904 },
        { year: 107, county: '新竹市', value: 4.278780604896784 },
        { year: 107, county: '嘉義市', value: 4.475541486171276 },
        { year: 107, county: '金門縣', value: 0.9183844378503131 },
        { year: 107, county: '連江縣', value: 0.4533333333333333 },
        { year: 108, county: '新北市', value: 1.9578945317067467 },
        { year: 108, county: '臺北市', value: 9.731929062879427 },
        { year: 108, county: '桃園市', value: 1.8420385765182847 },
        { year: 108, county: '臺中市', value: 1.2710613168148306 },
        { year: 108, county: '臺南市', value: 0.8582145871831726 },
        { year: 108, county: '高雄市', value: 0.9394779545031082 },
        { year: 108, county: '宜蘭縣', value: 0.21187430608036875 },
        { year: 108, county: '新竹縣', value: 0.39504108495092927 },
        { year: 108, county: '苗栗縣', value: 0.29965170767616506 },
        { year: 108, county: '彰化縣', value: 1.184674094137138 },
        { year: 108, county: '南投縣', value: 0.12032641491514526 },
        { year: 108, county: '雲林縣', value: 0.5278045908446504 },
        { year: 108, county: '嘉義縣', value: 0.2642913801526557 },
        { year: 108, county: '屏東縣', value: 0.2951376279002738 },
        { year: 108, county: '臺東縣', value: 0.06166872910888272 },
        { year: 108, county: '花蓮縣', value: 0.0704854847177422 },
        { year: 108, county: '澎湖縣', value: 0.8293157811760997 },
        { year: 108, county: '基隆市', value: 2.778854990583804 },
        { year: 108, county: '新竹市', value: 4.309198271723476 },
        { year: 108, county: '嘉義市', value: 4.46001332889037 },
        { year: 108, county: '金門縣', value: 0.9243982855258819 },
        { year: 108, county: '連江縣', value: 0.45447916666666666 },
        { year: 109, county: '新北市', value: 1.9633628249600499 },
        { year: 109, county: '臺北市', value: 9.596865226829538 },
        { year: 109, county: '桃園市', value: 1.855882714279864 },
        { year: 109, county: '臺中市', value: 1.272093422246703 },
        { year: 109, county: '臺南市', value: 0.8559345698446377 },
        { year: 109, county: '高雄市', value: 0.9375080034554601 },
        { year: 109, county: '宜蘭縣', value: 0.2114689170655247 },
        { year: 109, county: '新竹縣', value: 0.39898636105721075 },
        { year: 109, county: '苗栗縣', value: 0.2984585043206926 },
        { year: 109, county: '彰化縣', value: 1.1800053984121222 },
        { year: 109, county: '南投縣', value: 0.11970154124141894 },
        { year: 109, county: '雲林縣', value: 0.5249870238528699 },
        { year: 109, county: '嘉義縣', value: 0.2627175449010575 },
        { year: 109, county: '屏東縣', value: 0.29315319210260843 },
        { year: 109, county: '臺東縣', value: 0.0612952137116848 },
        { year: 109, county: '花蓮縣', value: 0.07013008337348252 },
        { year: 109, county: '澎湖縣', value: 0.834873088443954 },
        { year: 109, county: '基隆市', value: 2.771299435028249 },
        { year: 109, county: '新竹市', value: 4.3283053288526165 },
        { year: 109, county: '嘉義市', value: 4.436037987337554 },
        { year: 109, county: '金門縣', value: 0.9259479063633367 },
        { year: 109, county: '連江縣', value: 0.4565625 },
    ],
    livingFacilitiesData: [
        { county: '基隆市', year: 103, value: 180 },
        { county: '基隆市', year: 104, value: 180 },
        { county: '基隆市', year: 105, value: 191 },
        { county: '基隆市', year: 106, value: 197 },
        { county: '基隆市', year: 107, value: 200 },
        { county: '基隆市', year: 108, value: 200 },
        { county: '基隆市', year: 109, value: 201 },
        { county: '臺北市', year: 103, value: 1271 },
        { county: '臺北市', year: 104, value: 1271 },
        { county: '臺北市', year: 105, value: 1294 },
        { county: '臺北市', year: 106, value: 1362 },
        { county: '臺北市', year: 107, value: 1394 },
        { county: '臺北市', year: 108, value: 1402 },
        { county: '臺北市', year: 109, value: 1409 },
        { county: '新北市', year: 103, value: 1357 },
        { county: '新北市', year: 104, value: 1396 },
        { county: '新北市', year: 105, value: 1478 },
        { county: '新北市', year: 106, value: 1532 },
        { county: '新北市', year: 107, value: 1567 },
        { county: '新北市', year: 108, value: 1593 },
        { county: '新北市', year: 109, value: 1604 },
        { county: '桃園市', year: 103, value: 939 },
        { county: '桃園市', year: 104, value: 955 },
        { county: '桃園市', year: 105, value: 995 },
        { county: '桃園市', year: 106, value: 1017 },
        { county: '桃園市', year: 107, value: 1066 },
        { county: '桃園市', year: 108, value: 1091 },
        { county: '桃園市', year: 109, value: 1098 },
        { county: '新竹市', year: 103, value: 296 },
        { county: '新竹市', year: 104, value: 300 },
        { county: '新竹市', year: 105, value: 306 },
        { county: '新竹市', year: 106, value: 308 },
        { county: '新竹市', year: 107, value: 320 },
        { county: '新竹市', year: 108, value: 323 },
        { county: '新竹市', year: 109, value: 324 },
        { county: '新竹縣', year: 103, value: 425 },
        { county: '新竹縣', year: 104, value: 428 },
        { county: '新竹縣', year: 105, value: 435 },
        { county: '新竹縣', year: 106, value: 443 },
        { county: '新竹縣', year: 107, value: 445 },
        { county: '新竹縣', year: 108, value: 453 },
        { county: '新竹縣', year: 109, value: 453 },
        { county: '苗栗縣', year: 103, value: 468 },
        { county: '苗栗縣', year: 104, value: 482 },
        { county: '苗栗縣', year: 105, value: 486 },
        { county: '苗栗縣', year: 106, value: 492 },
        { county: '苗栗縣', year: 107, value: 494 },
        { county: '苗栗縣', year: 108, value: 497 },
        { county: '苗栗縣', year: 109, value: 502 },
        { county: '臺中市', year: 103, value: 1204 },
        { county: '臺中市', year: 104, value: 1210 },
        { county: '臺中市', year: 105, value: 1236 },
        { county: '臺中市', year: 106, value: 1256 },
        { county: '臺中市', year: 107, value: 1276 },
        { county: '臺中市', year: 108, value: 1287 },
        { county: '臺中市', year: 109, value: 1294 },
        { county: '彰化縣', year: 103, value: 1028 },
        { county: '彰化縣', year: 104, value: 1046 },
        { county: '彰化縣', year: 105, value: 1051 },
        { county: '彰化縣', year: 106, value: 1056 },
        { county: '彰化縣', year: 107, value: 1071 },
        { county: '彰化縣', year: 108, value: 1073 },
        { county: '彰化縣', year: 109, value: 1078 },
        { county: '南投縣', year: 103, value: 501 },
        { county: '南投縣', year: 104, value: 517 },
        { county: '南投縣', year: 105, value: 528 },
        { county: '南投縣', year: 106, value: 532 },
        { county: '南投縣', year: 107, value: 532 },
        { county: '南投縣', year: 108, value: 536 },
        { county: '南投縣', year: 109, value: 537 },
        { county: '雲林縣', year: 103, value: 723 },
        { county: '雲林縣', year: 104, value: 727 },
        { county: '雲林縣', year: 105, value: 730 },
        { county: '雲林縣', year: 106, value: 736 },
        { county: '雲林縣', year: 107, value: 738 },
        { county: '雲林縣', year: 108, value: 742 },
        { county: '雲林縣', year: 109, value: 743 },
        { county: '嘉義市', year: 103, value: 169 },
        { county: '嘉義市', year: 104, value: 169 },
        { county: '嘉義市', year: 105, value: 175 },
        { county: '嘉義市', year: 106, value: 177 },
        { county: '嘉義市', year: 107, value: 179 },
        { county: '嘉義市', year: 108, value: 179 },
        { county: '嘉義市', year: 109, value: 181 },
        { county: '嘉義縣', year: 103, value: 442 },
        { county: '嘉義縣', year: 104, value: 446 },
        { county: '嘉義縣', year: 105, value: 450 },
        { county: '嘉義縣', year: 106, value: 453 },
        { county: '嘉義縣', year: 107, value: 456 },
        { county: '嘉義縣', year: 108, value: 463 },
        { county: '嘉義縣', year: 109, value: 467 },
        { county: '臺南市', year: 103, value: 1112 },
        { county: '臺南市', year: 104, value: 1131 },
        { county: '臺南市', year: 105, value: 1139 },
        { county: '臺南市', year: 106, value: 1156 },
        { county: '臺南市', year: 107, value: 1163 },
        { county: '臺南市', year: 108, value: 1184 },
        { county: '臺南市', year: 109, value: 1186 },
        { county: '高雄市', year: 103, value: 1479 },
        { county: '高雄市', year: 104, value: 1501 },
        { county: '高雄市', year: 105, value: 1517 },
        { county: '高雄市', year: 106, value: 1547 },
        { county: '高雄市', year: 107, value: 1558 },
        { county: '高雄市', year: 108, value: 1568 },
        { county: '高雄市', year: 109, value: 1574 },
        { county: '屏東縣', year: 103, value: 692 },
        { county: '屏東縣', year: 104, value: 698 },
        { county: '屏東縣', year: 105, value: 703 },
        { county: '屏東縣', year: 106, value: 708 },
        { county: '屏東縣', year: 107, value: 714 },
        { county: '屏東縣', year: 108, value: 716 },
        { county: '屏東縣', year: 109, value: 721 },
        { county: '臺東縣', year: 103, value: 359 },
        { county: '臺東縣', year: 104, value: 360 },
        { county: '臺東縣', year: 105, value: 362 },
        { county: '臺東縣', year: 106, value: 366 },
        { county: '臺東縣', year: 107, value: 368 },
        { county: '臺東縣', year: 108, value: 368 },
        { county: '臺東縣', year: 109, value: 368 },
        { county: '花蓮縣', year: 103, value: 437 },
        { county: '花蓮縣', year: 104, value: 446 },
        { county: '花蓮縣', year: 105, value: 454 },
        { county: '花蓮縣', year: 106, value: 464 },
        { county: '花蓮縣', year: 107, value: 469 },
        { county: '花蓮縣', year: 108, value: 473 },
        { county: '花蓮縣', year: 109, value: 473 },
        { county: '宜蘭縣', year: 103, value: 383 },
        { county: '宜蘭縣', year: 104, value: 401 },
        { county: '宜蘭縣', year: 105, value: 422 },
        { county: '宜蘭縣', year: 106, value: 427 },
        { county: '宜蘭縣', year: 107, value: 435 },
        { county: '宜蘭縣', year: 108, value: 438 },
        { county: '宜蘭縣', year: 109, value: 442 },
        { county: '澎湖縣', year: 103, value: 132 },
        { county: '澎湖縣', year: 104, value: 132 },
        { county: '澎湖縣', year: 105, value: 136 },
        { county: '澎湖縣', year: 106, value: 136 },
        { county: '澎湖縣', year: 107, value: 136 },
        { county: '澎湖縣', year: 108, value: 137 },
        { county: '澎湖縣', year: 109, value: 141 },
        { county: '金門縣', year: 103, value: 118 },
        { county: '金門縣', year: 104, value: 119 },
        { county: '金門縣', year: 105, value: 119 },
        { county: '金門縣', year: 106, value: 119 },
        { county: '金門縣', year: 107, value: 119 },
        { county: '金門縣', year: 108, value: 119 },
        { county: '金門縣', year: 109, value: 119 },
        { county: '連江縣', year: 103, value: 31 },
        { county: '連江縣', year: 104, value: 31 },
        { county: '連江縣', year: 105, value: 32 },
        { county: '連江縣', year: 106, value: 32 },
        { county: '連江縣', year: 107, value: 32 },
        { county: '連江縣', year: 108, value: 32 },
        { county: '連江縣', year: 109, value: 32 },
    ],
    housingPricesData: [
        { county: '基隆市', year: 103, value: 114473 },
        { county: '基隆市', year: 104, value: 122848 },
        { county: '基隆市', year: 105, value: 154846 },
        { county: '基隆市', year: 106, value: 134678 },
        { county: '基隆市', year: 107, value: 138917 },
        { county: '基隆市', year: 108, value: 140188 },
        { county: '基隆市', year: 109, value: 142729 },
        { county: '臺北市', year: 103, value: 579319 },
        { county: '臺北市', year: 104, value: 558678 },
        { county: '臺北市', year: 105, value: 555717 },
        { county: '臺北市', year: 106, value: 545083 },
        { county: '臺北市', year: 107, value: 567626 },
        { county: '臺北市', year: 108, value: 580193 },
        { county: '臺北市', year: 109, value: 590939 },
        { county: '新北市', year: 103, value: 308324 },
        { county: '新北市', year: 104, value: 301926 },
        { county: '新北市', year: 105, value: 295423 },
        { county: '新北市', year: 106, value: 304213 },
        { county: '新北市', year: 107, value: 305276 },
        { county: '新北市', year: 108, value: 314269 },
        { county: '新北市', year: 109, value: 324264 },
        { county: '桃園市', year: 103, value: 167002 },
        { county: '桃園市', year: 104, value: 170797 },
        { county: '桃園市', year: 105, value: 159494 },
        { county: '桃園市', year: 106, value: 168820 },
        { county: '桃園市', year: 107, value: 172142 },
        { county: '桃園市', year: 108, value: 181117 },
        { county: '桃園市', year: 109, value: 187635 },
        { county: '新竹市', year: 103, value: 179352 },
        { county: '新竹市', year: 104, value: 182283 },
        { county: '新竹市', year: 105, value: 202711 },
        { county: '新竹市', year: 106, value: 201316 },
        { county: '新竹市', year: 107, value: 202464 },
        { county: '新竹市', year: 108, value: 197370 },
        { county: '新竹市', year: 109, value: 214413 },
        { county: '新竹縣', year: 103, value: 174388 },
        { county: '新竹縣', year: 104, value: 170944 },
        { county: '新竹縣', year: 105, value: 180400 },
        { county: '新竹縣', year: 106, value: 181679 },
        { county: '新竹縣', year: 107, value: 185421 },
        { county: '新竹縣', year: 108, value: 185084 },
        { county: '新竹縣', year: 109, value: 191441 },
        { county: '苗栗縣', year: 103, value: 114264 },
        { county: '苗栗縣', year: 104, value: 128208 },
        { county: '苗栗縣', year: 105, value: 128803 },
        { county: '苗栗縣', year: 106, value: 139134 },
        { county: '苗栗縣', year: 107, value: 136810 },
        { county: '苗栗縣', year: 108, value: 135868 },
        { county: '苗栗縣', year: 109, value: 144390 },
        { county: '臺中市', year: 103, value: 158119 },
        { county: '臺中市', year: 104, value: 168340 },
        { county: '臺中市', year: 105, value: 171398 },
        { county: '臺中市', year: 106, value: 179425 },
        { county: '臺中市', year: 107, value: 181147 },
        { county: '臺中市', year: 108, value: 190443 },
        { county: '臺中市', year: 109, value: 200542 },
        { county: '彰化縣', year: 103, value: 114608 },
        { county: '彰化縣', year: 104, value: 129015 },
        { county: '彰化縣', year: 105, value: 129392 },
        { county: '彰化縣', year: 106, value: 136813 },
        { county: '彰化縣', year: 107, value: 140504 },
        { county: '彰化縣', year: 108, value: 149871 },
        { county: '彰化縣', year: 109, value: 153167 },
        { county: '南投縣', year: 103, value: 100909 },
        { county: '南投縣', year: 104, value: 109921 },
        { county: '南投縣', year: 105, value: 115394 },
        { county: '南投縣', year: 106, value: 126473 },
        { county: '南投縣', year: 107, value: 129084 },
        { county: '南投縣', year: 108, value: 129693 },
        { county: '南投縣', year: 109, value: 139676 },
        { county: '雲林縣', year: 103, value: 93623 },
        { county: '雲林縣', year: 104, value: 100582 },
        { county: '雲林縣', year: 105, value: 100524 },
        { county: '雲林縣', year: 106, value: 107582 },
        { county: '雲林縣', year: 107, value: 115064 },
        { county: '雲林縣', year: 108, value: 120579 },
        { county: '雲林縣', year: 109, value: 123554 },
        { county: '嘉義市', year: 103, value: 96655 },
        { county: '嘉義市', year: 104, value: 99902 },
        { county: '嘉義市', year: 105, value: 109972 },
        { county: '嘉義市', year: 106, value: 110000 },
        { county: '嘉義市', year: 107, value: 114298 },
        { county: '嘉義市', year: 108, value: 120883 },
        { county: '嘉義市', year: 109, value: 126264 },
        { county: '嘉義縣', year: 103, value: 83557 },
        { county: '嘉義縣', year: 104, value: 97557 },
        { county: '嘉義縣', year: 105, value: 91203 },
        { county: '嘉義縣', year: 106, value: 106939 },
        { county: '嘉義縣', year: 107, value: 99603 },
        { county: '嘉義縣', year: 108, value: 103914 },
        { county: '嘉義縣', year: 109, value: 106445 },
        { county: '臺南市', year: 103, value: 119233 },
        { county: '臺南市', year: 104, value: 127445 },
        { county: '臺南市', year: 105, value: 137312 },
        { county: '臺南市', year: 106, value: 138263 },
        { county: '臺南市', year: 107, value: 143547 },
        { county: '臺南市', year: 108, value: 147805 },
        { county: '臺南市', year: 109, value: 156099 },
        { county: '高雄市', year: 103, value: 145421 },
        { county: '高雄市', year: 104, value: 148826 },
        { county: '高雄市', year: 105, value: 156653 },
        { county: '高雄市', year: 106, value: 157750 },
        { county: '高雄市', year: 107, value: 160709 },
        { county: '高雄市', year: 108, value: 166377 },
        { county: '高雄市', year: 109, value: 172468 },
        { county: '屏東縣', year: 103, value: 81428 },
        { county: '屏東縣', year: 104, value: 93802 },
        { county: '屏東縣', year: 105, value: 93785 },
        { county: '屏東縣', year: 106, value: 94410 },
        { county: '屏東縣', year: 107, value: 105226 },
        { county: '屏東縣', year: 108, value: 110316 },
        { county: '屏東縣', year: 109, value: 113524 },
        { county: '臺東縣', year: 103, value: 97021 },
        { county: '臺東縣', year: 104, value: 103064 },
        { county: '臺東縣', year: 105, value: 109940 },
        { county: '臺東縣', year: 106, value: 114860 },
        { county: '臺東縣', year: 107, value: 125126 },
        { county: '臺東縣', year: 108, value: 131970 },
        { county: '臺東縣', year: 109, value: 125916 },
        { county: '花蓮縣', year: 103, value: 116965 },
        { county: '花蓮縣', year: 104, value: 136640 },
        { county: '花蓮縣', year: 105, value: 139304 },
        { county: '花蓮縣', year: 106, value: 148787 },
        { county: '花蓮縣', year: 107, value: 151413 },
        { county: '花蓮縣', year: 108, value: 156893 },
        { county: '花蓮縣', year: 109, value: 165289 },
        { county: '宜蘭縣', year: 103, value: 133729 },
        { county: '宜蘭縣', year: 104, value: 160706 },
        { county: '宜蘭縣', year: 105, value: 157656 },
        { county: '宜蘭縣', year: 106, value: 156869 },
        { county: '宜蘭縣', year: 107, value: 160078 },
        { county: '宜蘭縣', year: 108, value: 161831 },
        { county: '宜蘭縣', year: 109, value: 167734 },
        { county: '澎湖縣', year: 103, value: 107036 },
        { county: '澎湖縣', year: 104, value: 107826 },
        { county: '澎湖縣', year: 105, value: 104615 },
        { county: '澎湖縣', year: 106, value: 144073 },
        { county: '澎湖縣', year: 107, value: 116385 },
        { county: '澎湖縣', year: 108, value: 121717 },
        { county: '澎湖縣', year: 109, value: 127772 },
        { county: '金門縣', year: 103, value: 172559 },
        { county: '金門縣', year: 104, value: 192793 },
        { county: '金門縣', year: 105, value: 202795 },
        { county: '金門縣', year: 106, value: 199114 },
        { county: '金門縣', year: 107, value: 189947 },
        { county: '金門縣', year: 108, value: 194383 },
        { county: '金門縣', year: 109, value: 200559 },
        { county: '連江縣', year: 103, value: 112235 },
        { county: '連江縣', year: 104, value: 112235 },
        { county: '連江縣', year: 105, value: 38410 },
        { county: '連江縣', year: 106, value: 10631 },
        { county: '連江縣', year: 107, value: 77663 },
        { county: '連江縣', year: 108, value: 77663 },
        { county: '連江縣', year: 109, value: 77663 },
    ],
    renderSelection: function () {
        const svgContainer = d3
            .select("#svg4");
        svgContainer
            .selectAll("rect")
            .remove();
        svgContainer
            .selectAll("svg")
            .remove();
        svgContainer
            .selectAll("div")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();
        svgContainer
            .selectAll("button")
            .remove();
        svgContainer
            .selectAll("text")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();

        const width = svgContainer
            .style("width")
            .slice(0, -2);
        const height = svgContainer
            .style("height")
            .slice(0, -2);
        const widthMargin = 40;
        const heightMargin = 40;

        svgContainer
            .append("text")
            .attr("text-anchor", "middle")
            .text("select a county");

        const countySelect = svgContainer
            .append("select")
            .attr("id", "countySelect")
            .on("change", function () {
                const county = d3
                    .select(this)
                    .property("value");
                Integration.renderChart1(county);
            });

        for (let i = 0; i < Integration.countyData.length; i++) {
            countySelect.append("option")
                .attr("value", `${Integration.countyData[i]}`)
                .text(`${Integration.countyData[i]}`);
        }
    },
    renderChart1: function (county="臺北市") {
        const svgContainer = d3
            .select("#svg1");
        svgContainer
            .selectAll("rect")
            .remove();
        svgContainer
            .selectAll("svg")
            .remove();
        svgContainer
            .selectAll("div")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();
        svgContainer
            .selectAll("button")
            .remove();
        svgContainer
            .selectAll("text")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();

        const width = svgContainer
            .style("width")
            .slice(0, -2);
        const height = svgContainer
            .style("height")
            .slice(0, -2);
        const widthMargin = 40;
        const heightMargin = 40;
        const cellWidth = (width - widthMargin * 2) / 4;
        const cellHeight = (height - heightMargin * 2) / 4;
        const tooltip = svgContainer
            .append("div")
            .style("opacity", 0.0)
            .style("left", "0px")
            .style("top", "0px");
        const svg = svgContainer
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("font-size", "16px")
            .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
            .text("Correlation Matrix");

        const colors = [
            // negative
            "#804040",
            "#984B4B",
            "#AD5A5A",
            "#B87070",
            "#C48888",
            "#CF9E9E",
            "#D9B3B3",
            "#E1C4C4",
            "#EBD6D6",
            "#F2E6E6",
            "#F0F0F0",

            // positive
            "#F3F3FA",
            "#E6E6F2",
            "#D8D8EB",
            "#C7C7E2",
            "#B8B8DC",
            "#A6A6D2",
            "#9999CC",
            "#8080C0",
            "#7373B9",
            "#5A5AAD",
        ];

        Integration.housingPricesData
            .sort(function (a, b) { a.year - b.year; });
        Integration.housingPricesData
            .sort(function (a, b) { a.year - b.year; });
        Integration.housingPricesData
            .sort(function (a, b) { a.year - b.year; });

        const axisTitles = ["", "房價", "人口密度", "體育館"];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                else if (i == 0) {
                    svg
                        .append("rect")
                        .attr("x", i * cellWidth + widthMargin)
                        .attr("y", j * cellHeight + heightMargin)
                        .attr("width", cellWidth)
                        .attr("height", cellHeight)
                        .attr("fill", "none");
                    svg
                        .append("text")
                        .attr("x", (i + 0.5) * cellWidth + widthMargin)
                        .attr("y", (j + 0.5) * cellHeight + heightMargin)
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .attr("font-size", "14px")
                        .text(`${axisTitles[j]}`);
                }
                else if (j == 0) {
                    svg
                        .append("rect")
                        .attr("x", i * cellWidth + widthMargin)
                        .attr("y", j * cellHeight + heightMargin)
                        .attr("width", cellWidth)
                        .attr("height", cellHeight)
                        .attr("fill", "none");
                    svg
                        .append("text")
                        .attr("x", (i + 0.5) * cellWidth + widthMargin)
                        .attr("y", (j + 0.5) * cellHeight + heightMargin)
                        .attr("text-anchor", "middle")
                        .attr("dy", "0.35em")
                        .attr("font-size", "14px")
                        .text(`${axisTitles[i]}`);
                }
                else {
                    const data = [
                        Integration.housingPricesData,
                        Integration.populationData,
                        Integration.livingFacilitiesData
                    ];

                    const data1 = data[i - 1]
                        .filter(function (d) { return d.county == county; })
                        .map(function (d) { return d.value; });
                    const data2 = data[j - 1]
                        .filter(function (d) { return d.county == county; })
                        .map(function (d) { return d.value; });

                    let xsum = 0.0, ysum = 0.0;
                    for (let k = 0; k < data1.length; k++) {
                        xsum += parseFloat(data1[k]);
                        ysum += parseFloat(data2[k]);
                    }

                    const xavg = xsum / data1.length;
                    const yavg = ysum / data2.length;

                    let xxsum = 0.0, yysum = 0.0, xysum = 0.0;
                    for (let k = 0; k < data1.length; k++) {
                        xxsum += (parseFloat(data1[k]) - xavg) *
                            (parseFloat(data1[k]) - xavg);
                        yysum += (parseFloat(data2[k]) - yavg) *
                            (parseFloat(data2[k]) - yavg);
                        xysum += (parseFloat(data1[k]) - xavg) *
                            (parseFloat(data2[k]) - yavg);
                    }

                    const r = Math.round(xysum / Math.sqrt(xxsum * yysum) * 100) / 100;

                    svg
                        .append("rect")
                        .attr("x", i * cellWidth + widthMargin)
                        .attr("y", j * cellHeight + heightMargin)
                        .attr("width", cellWidth)
                        .attr("height", cellHeight)
                        .attr("fill", colors[Math.floor((r * 10)) + 10])
                    svg
                        .append("text")
                        .attr("x", (i + 0.5) * cellWidth + widthMargin)
                        .attr("y", (j + 0.5) * cellHeight + heightMargin)
                        .attr("text-anchor", "middle")
                        
                        .attr("font-size", "14px")
                        .style("border-radius", "10px")
                        .text(`${r}`);
                }
            }
        }
    },
    renderChart2: function () {
        const svgContainer = d3
            .select("#svg5");
        svgContainer
            .selectAll("rect")
            .remove();
        svgContainer
            .selectAll("svg")
            .remove();
        svgContainer
            .selectAll("div")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();
        svgContainer
            .selectAll("button")
            .remove();
        svgContainer
            .selectAll("text")
            .remove();
        svgContainer
            .selectAll("select")
            .remove();
    }
}


// function renderSelection(jsonData) {
//     const svgContainer = d3.select("#svg4");

//     svgContainer.selectAll("rect")
//         .remove();
//     svgContainer.selectAll("svg")
//         .remove();
//     svgContainer.selectAll("div")
//         .remove();
//     svgContainer.selectAll("select")
//         .remove();
//     svgContainer.selectAll("button")

//     const textSelection = d3.select("#svg4")
//         .append("div")
//         .append("text")
//         .attr("class", "text-above-selection")
//         .attr("text-anchor", "middle")
//         .text("Select a County");
//     console.log("aaaaaaaaaaaaa");

//     let temp = {
//         "臺北市": 271.79,
//         "嘉義市": 60.02,
//         "新竹市": 104.15,
//         "基隆市": 132.75,
//         "新北市": 2052.56,
//         "桃園市": 1220.95,
//         "臺中市": 2214.89,
//         "彰化縣": 1074.39,
//         "金門縣": 151.65,
//         "高雄市": 2951.85,
//         "澎湖縣": 126.86,
//         "臺南市": 2191.65,
//         "雲林縣": 1290.83,
//         "連江縣": 28.80,
//         "新竹縣": 1427.53,
//         "苗栗縣": 1820.31,
//         "屏東縣": 2775.60,
//         "嘉義縣": 1903.63,
//         "宜蘭縣": 2143.62,
//         "南投縣": 4106.43,
//         "花蓮縣": 4628.57,
//         "臺東縣": 3515.25
//     };

//     // Create two <select> elements and append them to the body
//     const countySelect = d3.select("#svg4")
//         .append("select")
//         .attr("id", "countySelect")
//         .on("change", function () {
//             const county = d3.select(this)
//                 .property("value");
//         });

//     // countySelect.append("option")
//     //     .attr("value", `縣市`)
//     //     .text(`縣市`)
//     //     .attr("selected", true);

//     for (let c in temp) {
//         countySelect.append("option")
//             .attr("value", `${c}`)
//             .text(`${c}`);
//         // .attr("selected", true);
//     }
//     // Set default values for the <select> elements

// }

function renderCorrelationMatrix() {
    const svgContainer = d3
        .select("#svg1");
    svgContainer
        .selectAll("rect")
        .remove();
    svgContainer
        .selectAll("svg")
        .remove();
    svgContainer
        .selectAll("div")
        .remove();
    svgContainer
        .selectAll("select")
        .remove();
    svgContainer
        .selectAll("button")
        .remove();

    const width = svgContainer
        .style("width")
        .slice(0, -2);
    const height = svgContainer
        .style("height")
        .slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;
    const cellWidth = (width - widthMargin * 2) / 4;
    const cellHeight = (height - heightMargin * 2) / 4;
    const tooltip = svgContainer
        .append("div")
        .style("opacity", 0.0)
        .style("left", "0px")
        .style("top", "0px");
    const svg = svgContainer
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("font-size", "16px")
        .attr("transform", `translate(${width / 2}, ${heightMargin - 10}) rotate(0)`)
        .text("Correlation Matrix");

    const colors = [
        // negative
        "#804040",
        "#984B4B",
        "#AD5A5A",
        "#B87070",
        "#C48888",
        "#CF9E9E",
        "#D9B3B3",
        "#E1C4C4",
        "#EBD6D6",
        "#F2E6E6",
        "#F0F0F0",

        // positive
        "#F3F3FA",
        "#E6E6F2",
        "#D8D8EB",
        "#C7C7E2",
        "#B8B8DC",
        "#A6A6D2",
        "#9999CC",
        "#8080C0",
        "#7373B9",
        "#5A5AAD",
    ];




    // return;

    const axisTitles = ["", "房價", "人口密度", "體育館"];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            else if (i == 0) {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "none");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .text(`${axisTitles[j]}`);
            }
            else if (j == 0) {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "none");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .text(`${axisTitles[i]}`);
            }
            else {
                svg
                    .append("rect")
                    .attr("x", i * cellWidth + widthMargin)
                    .attr("y", j * cellHeight + heightMargin)
                    .attr("width", cellWidth)
                    .attr("height", cellHeight)
                    .attr("fill", "#FF0000");
                svg
                    .append("text")
                    .attr("x", (i + 0.5) * cellWidth + widthMargin)
                    .attr("y", (j + 0.5) * cellHeight + heightMargin)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "14px")
                    .style("border-radius", "10px")
                    .text("abc");
            }
        }
    }
}

function renderScatterPlots() {
    const svgContainer = d3
        .select("#svg5");
    svgContainer
        .selectAll("rect")
        .remove();
    svgContainer
        .selectAll("svg")
        .remove();
    svgContainer
        .selectAll("div")
        .remove();
    svgContainer
        .selectAll("select")
        .remove();
    svgContainer
        .selectAll("button")
        .remove();

    const width = svgContainer
        .style("width")
        .slice(0, -2);
    const height = svgContainer
        .style("height")
        .slice(0, -2);
    const widthMargin = 40;
    const heightMargin = 40;
    const cellWidth = (width - widthMargin * 2) / 4;
    const cellHeight = (height - heightMargin * 2) / 4;
    const tooltip = svgContainer
        .append("div")
        .style("opacity", 0.0)
        .style("left", "0px")
        .style("top", "0px");
    const svg = svgContainer
        .append("svg")
        .attr("width", width)
        .attr("height", height);
}