const STORAGE_KEY = "mashuDogDietLoop.v1";
const ADVANCE_DELAY = 900;

const mealPlans = [
  {
    id: "mashu-carb-backload",
    title: "掉秤神结构｜碳水后置日",
    series: "食欲稳定结构",
    source: "小红书：发现一个掉秤神结构",
    summary: "上午高饱腹液体，中午蛋白加中碳水，晚上高碳水低脂。",
    fit: "适合晚上高食欲、下班后容易乱吃的人。",
    meals: [
      { slot: "10:30", food: "喝一杯有脂肪的高饱腹液体：生酪、芝士、咸酪乳、黄油 dirty 或含奶饮品，选自己喝了满足的。" },
      { slot: "午餐", food: "高蛋白 + 中碳水：120g 牛肉、鸡胸或虾仁，加馒头、冷藏土豆、芋头、红薯、贝贝南瓜等，再配少油盐蔬菜。" },
      { slot: "下午", food: "饿了吃黄瓜或番茄；嘴巴没味儿可喝苹果醋气泡水，慢慢喝。" },
      { slot: "晚餐", food: "高碳水低脂：白馒头为主，配少油盐蔬菜和适量蛋白；吃够但不吃撑。" }
    ],
    rules: ["原文强调碳水后置和食欲稳定。", "低血糖、胃不舒服或工作强度很高时不要硬撑上午液体。"]
  },
  {
    id: "festival-reset-1",
    title: "节后三日 Day1｜排水日",
    series: "节后恢复三日",
    source: "小红书：节后快速恢复体重3日食谱",
    summary: "白天乌龙茶兑奶，晚上豆腐菌菇菠菜。",
    fit: "适合节后水肿、盐分偏高后的第一天。",
    meals: [
      { slot: "白天", food: "乌龙茶 + 两盒牛奶 + 1 条黑咖啡 + 2 条生可可粉，10:00 后开始慢慢喝。" },
      { slot: "补充", food: "早餐时吃维 B；如果饿得明显，可以加鸡蛋 1 个。" },
      { slot: "晚餐", food: "内酯豆腐 1 块 + 菌菇 + 菠菜，少盐，橄榄油或猪油约 5g，做成少汤热菜。" },
      { slot: "不够饱", food: "可加冷冻香蕉 1 根，不额外加零食甜品。" }
    ],
    rules: ["全天喝水 1500-2000ml，午晚餐前后 1 小时不要大量灌水。", "这是短期恢复，不是长期餐单。"]
  },
  {
    id: "festival-reset-2",
    title: "节后三日 Day2｜三明治燕麦日",
    series: "节后恢复三日",
    source: "小红书：节后快速恢复体重3日食谱",
    summary: "早餐乌龙茶兑奶，午餐三明治，晚餐豆乳燕麦碗。",
    fit: "适合想比 Day1 更有咀嚼感的一天。",
    meals: [
      { slot: "早餐", food: "一瓶乌龙茶兑牛奶，可做抹茶版。" },
      { slot: "午餐", food: "三明治 1 个：便利店大小、小赛 6 寸，或外卖半个。" },
      { slot: "晚餐", food: "豆乳燕麦碗拌生可可粉 + 鸡蛋 1 个。" }
    ],
    rules: ["三明治少酱更稳。", "不加薯片、曲奇、奶茶和甜品。"]
  },
  {
    id: "festival-reset-3",
    title: "节后三日 Day3｜鸡肉三文鱼日",
    series: "节后恢复三日",
    source: "小红书：节后快速恢复体重3日食谱",
    summary: "酸奶豆浆粉早餐，去皮鸡肉土豆午餐，鱼或蛋配菠菜晚餐。",
    fit: "适合恢复期第三天，蛋白更完整。",
    meals: [
      { slot: "早餐", food: "无糖酸奶 + 豆浆粉 + 冷冻香蕉 1 根 + 抹茶粉。" },
      { slot: "午餐", food: "清淡黄焖鸡口径：去皮鸡肉 + 香菇 + 土豆 1 个，少油少盐；原文紫菜汤不列入打卡。" },
      { slot: "晚餐", food: "三文鱼约 150g，或鸡蛋 2 个 + 水煮菠菜。" }
    ],
    rules: ["睡眠不足会影响掉秤，优先睡够。", "大基数或明显饿的人可适当加燕麦、土豆、香蕉等干净碳水。"]
  },
  {
    id: "white-liquid-stable",
    title: "白日液断｜晚上高食欲稳定日",
    series: "白日液断",
    source: "小红书：一个晚上高食欲人的无痛稳定食欲方法",
    summary: "白天高饱腹液体加鸡蛋，晚上吃一顿有满足感的人饭。",
    fit: "适合短期维稳或节后恢复，不建议连续使用。",
    meals: [
      { slot: "白天主饮", food: "选一杯自己爱喝且饱腹感强的含奶液体：厚乳、生酪、芝士、dirty、热浓巧或自制高饱腹饮。" },
      { slot: "白天可喝", food: "乌龙茶、绿茶、红茶、黑咖、牛奶、豆浆、植物奶、薏米水、椰子水等。" },
      { slot: "饿了", food: "可吃鸡蛋、黑巧、酸奶、奶酪等少量高饱腹食物。" },
      { slot: "18:00 晚餐", food: "吃最想吃的一顿热乎正餐，必须有肉和蔬菜；家常菜、外食、汉堡、意面、麻辣烫均可，吃饱就停。" }
    ],
    rules: ["不要在很累或高压阶段液断。", "核心是满足感，不是用意志力硬忍。"]
  },
  {
    id: "three-cup-liquid-chicken",
    title: "三杯液断｜鸡胸三明治版",
    series: "白日液断",
    source: "小红书：邪修三杯液断法",
    summary: "乌龙茶、牛奶、黑咖、生可可粉慢喝，晚餐选鸡胸三明治。",
    fit: "适合想白天喝饱、晚上吃一餐的人。",
    meals: [
      { slot: "先喝水", food: "早上第一次饿时先喝水，等 10 分钟再判断是否真饿。" },
      { slot: "第一杯", food: "乌龙茶喝掉 1/3，加半盒牛奶和生可可粉，慢慢喝。" },
      { slot: "第二杯", food: "喝到一半后补剩余牛奶，加黑咖啡摇匀，继续慢慢喝。" },
      { slot: "第三杯", food: "茶味咖啡味淡后，用热水化开生可可粉倒入，做成热可可奶，尽量 16:00 前喝完。" },
      { slot: "晚餐", food: "蒸鸡胸 + 三明治 1 个，细嚼慢咽，18:00 前结束。" }
    ],
    rules: ["饿的时候可加鸡蛋 1 个。", "不建议用纯果汁、很甜冰淇淋或巧克力替代。"]
  },
  {
    id: "three-cup-liquid-beef",
    title: "三杯液断｜牛腱馒头版",
    series: "白日液断",
    source: "小红书：邪修三杯液断法",
    summary: "同三杯液体，晚餐用牛腱、蔬菜和白馒头收尾。",
    fit: "适合想要更稳、更有碳水托底的一天。",
    meals: [
      { slot: "白天", food: "按三杯液断喝法：乌龙茶 + 牛奶 + 黑咖 + 生可可粉，三品管慢喝。" },
      { slot: "补充", food: "真饿时加鸡蛋 1 个。" },
      { slot: "晚餐", food: "牛腱子 + 少汤煮蔬菜或焖菜 + 白馒头 1 个，吃饱就停。" }
    ],
    rules: ["餐后一小时不大量喝水，20:00 后少喝水。", "状态不好时不要全天液断。"]
  },
  {
    id: "three-cup-liquid-home",
    title: "三杯液断｜家常一荤两素版",
    series: "白日液断",
    source: "小红书：邪修三杯液断法",
    summary: "白天三杯液体，晚上回到一份家常饭。",
    fit: "适合想保留家庭正餐的人。",
    meals: [
      { slot: "白天", food: "乌龙茶、牛奶、黑咖和生可可粉分段慢喝，16:00 前喝完。" },
      { slot: "加餐", food: "饿了吃鸡蛋 1 个。" },
      { slot: "晚餐", food: "家常菜一荤两素，少油少盐，细嚼慢咽吃饱就停。" }
    ],
    rules: ["这天不靠硬饿，重点是喝得满足。", "不要连续多天照做。"]
  },
  {
    id: "bigmeal-salt",
    title: "大餐后｜高盐补钾排钠组",
    series: "大餐后恢复",
    source: "小红书：三种大餐后补救的对应方式",
    summary: "鸡蛋酸奶香蕉豆浆粉、椰子水煮肉、菠菜冬瓜芋头。",
    fit: "适合高盐水肿后恢复。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 酸奶香蕉拌豆浆粉 + 抹茶 1 条。" },
      { slot: "午餐", food: "椰子水煮肉 + 米饭约 150g。" },
      { slot: "晚餐", food: "菠菜烧冬瓜，多放菠菜，配芋头或土豆。" },
      { slot: "全天饮品", food: "可选薏米水、玉米须茶、乌龙茶、黑咖或青柑普洱；青柑普洱中午前喝完。" }
    ],
    rules: ["不是节食补救，是普通减脂期摄入量下的恢复。", "不要因此继续焦虑或疯狂运动。"]
  },
  {
    id: "bigmeal-carb",
    title: "大餐后｜高碳稳血糖组",
    series: "大餐后恢复",
    source: "小红书：三种大餐后补救的对应方式",
    summary: "乌龙茶兑奶、三明治、鸡蛋豆乳燕麦。",
    fit: "适合大餐后血糖波动、特别想继续吃的人。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 乌龙茶兑奶。" },
      { slot: "午餐", food: "三明治 1 个，便利店大小、小赛 6 寸或外卖半个；也可双吉去酱。" },
      { slot: "晚餐", food: "鸡蛋 1 个 + 豆乳燕麦，燕麦约 35g，拌生可可粉。" },
      { slot: "餐前", food: "正餐前可以喝一点苹果醋水。" }
    ],
    rules: ["碳水不是敌人，这组重点是稳住食欲。", "不加甜品和含糖饮料。"]
  },
  {
    id: "bigmeal-oil",
    title: "大餐后｜高油清肠组",
    series: "大餐后恢复",
    source: "小红书：三种大餐后补救的对应方式",
    summary: "乌龙茶兑奶、苹果酸奶燕麦、蔬菜虾燕麦。",
    fit: "适合高油大餐后想恢复肠胃轻盈的人。",
    meals: [
      { slot: "早餐", food: "乌龙茶兑奶 + 黑咖 1 条。" },
      { slot: "午餐", food: "鸡蛋 1 个 + 苹果酸奶燕麦 1 杯。" },
      { slot: "晚餐", food: "白菜、木耳、菠菜、金针菇等做成少汤热菜，配水煮虾和燕麦。" }
    ],
    rules: ["原文有汤类表达，这里按少汤热菜打卡。", "如果不饿，米饭、燕麦可减量，不要硬塞。"]
  },
  {
    id: "korean-light",
    title: "韩女轻断｜生活化版",
    series: "轻断食谱",
    source: "小红书：韩女轻断食谱的威力",
    summary: "鸡蛋黑咖牛奶、希腊酸奶燕麦、牛肉鸡胸粗粮蔬菜。",
    fit: "适合想清淡但不完全节食的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 黑咖啡 + 牛奶，10:00 后吃喝。" },
      { slot: "午餐", food: "希腊酸奶约 200g + 圣女果 + 燕麦。" },
      { slot: "晚餐", food: "牛肉或鸡胸 + 燕麦或蒸粗粮 + 一份蔬菜。" },
      { slot: "饮水", food: "全天喝够约 2L 水。" }
    ],
    rules: ["摄入不多时少运动，拉伸放松即可。", "想更严格也只建议减主食，不要忽视身体反应。"]
  },
  {
    id: "evening-appetite-liquid",
    title: "晚上高食欲｜白日液断掉秤法",
    series: "白日液断",
    source: "小红书：晚上高食欲人的无痛掉秤方法",
    summary: "白天液体和少量固体，晚上一顿热乎人饭。",
    fit: "适合大餐后清肠、下午不能犯困的上班或学习日。",
    meals: [
      { slot: "第一杯", food: "10:00 后喝牛奶、豆浆粉、蛋白饮、巴旦木奶、坚果奶、椰子水、茶或黑咖的组合。" },
      { slot: "白天固体", food: "鸡蛋、低糖水果、少量坚果、黑巧、蛋白棒、即食鸡胸/牛肉、奶酪或酸奶，早餐建议配 1 个鸡蛋。" },
      { slot: "晚餐", food: "选一顿热乎正餐，必须有整份蔬菜和一种蛋白质；家常菜、自选菜、小碗菜、麻辣烫、酸菜鱼都可以。" },
      { slot: "吃法", food: "先吃 100g 以上蔬菜，再按一口蔬菜、一口肉、一口主食循环吃，吃饱就停。" }
    ],
    rules: ["不建议连续使用。", "饮品不加糖，不加五谷养生粉到白天饮品里。"]
  },
  {
    id: "smallbase-7-1",
    title: "小基数七日 Day1｜饮品汉堡日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "鸡蛋饮品、三明治/汉堡/贝果堡，晚间轻补。",
    fit: "七日食谱第一天，偏方便外食。",
    meals: [
      { slot: "第一餐", food: "鸡蛋 1 个 + 无糖或低糖饮品，约 10:30 左右。" },
      { slot: "第二餐", food: "三明治、汉堡或贝果堡 1 个，可选双吉、板烧、去酱赛百味、便利店三明治。" },
      { slot: "晚上", food: "不饿或微饿加鸡蛋 1 个或蛋白棒；饿的话做蔬菜鸡蛋热菜，可放少量土豆、莲藕或魔芋面。" }
    ],
    rules: ["这组比较激烈，坚持不住就恢复正常饮食。"]
  },
  {
    id: "smallbase-7-2",
    title: "小基数七日 Day2｜纯蛋白热菜日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "一餐纯蛋白，一餐蔬菜鸡蛋热菜。",
    fit: "适合想低碳但不想复杂做饭的一天。",
    meals: [
      { slot: "第一餐", food: "纯蛋白质餐：便利店热柜手枪腿、半只烤鸡或窑鸡王，可不去皮。" },
      { slot: "第二餐", food: "蔬菜鸡蛋热菜：西兰花、菠菜、番茄、芹菜、秋葵、红薯叶、菌菇等，少汤少油。" }
    ],
    rules: ["盐不要太低，没力气就停止。"]
  },
  {
    id: "smallbase-7-3",
    title: "小基数七日 Day3｜三明治蛋白日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "三明治/汉堡/贝果堡加两个鸡蛋或蛋白棒。",
    fit: "适合上班日快速执行。",
    meals: [
      { slot: "第一餐", food: "三明治、汉堡或贝果堡 1 个，少酱。" },
      { slot: "第二餐", food: "鸡蛋 2 个，或蛋白棒 1 根。" }
    ],
    rules: ["不要额外加薯条、甜品和含糖饮料。"]
  },
  {
    id: "smallbase-7-4",
    title: "小基数七日 Day4｜饮品水果馒头日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "饮品低糖水果，鸡蛋配馒头或青菜包。",
    fit: "适合想有主食但控制餐次的一天。",
    meals: [
      { slot: "第一餐", food: "无糖饮品 + 低糖水果，如草莓或蓝莓。" },
      { slot: "第二餐", food: "鸡蛋 2 个 + 全麦馒头、白馒头或香菇青菜包 1 份。" }
    ],
    rules: ["水果不代替正餐蛋白质。"]
  },
  {
    id: "smallbase-7-5",
    title: "小基数七日 Day5｜黄瓜鸡蛋快餐日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "黄瓜鸡蛋饮品，搭配三明治/汉堡/贝果堡。",
    fit: "适合想省事的一天。",
    meals: [
      { slot: "第一餐", food: "黄瓜 1 根 + 鸡蛋 1 个 + 无糖或低糖饮品。" },
      { slot: "第二餐", food: "三明治、汉堡或贝果堡 1 个，尽量少酱。" }
    ],
    rules: ["明显饿或头晕时加干净碳水，不要硬撑。"]
  },
  {
    id: "smallbase-7-6",
    title: "小基数七日 Day6｜轻食蛋白日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "一份正常轻食，加鸡蛋或蛋白棒。",
    fit: "适合外食日执行。",
    meals: [
      { slot: "第一餐", food: "正常分量轻食 1 份，可以全吃完，如三文鱼能量碗等，避开高糖高酱款。" },
      { slot: "第二餐", food: "鸡蛋 2 个，或蛋白棒 1 根。" }
    ],
    rules: ["轻食酱料少放更稳。"]
  },
  {
    id: "smallbase-7-7",
    title: "小基数七日 Day7｜蔬菜鸡蛋馒头日",
    series: "小基数七日",
    source: "小红书：小基数七日食谱",
    summary: "无糖饮品低糖水果，水油鸡蛋焖菜配馒头。",
    fit: "七日食谱收尾日。",
    meals: [
      { slot: "第一餐", food: "无糖饮品 + 低糖水果。" },
      { slot: "第二餐", food: "水油鸡蛋焖菜 + 馒头 1 个。" }
    ],
    rules: ["如果情绪不好或压力大，不建议执行这一组七日食谱。"]
  },
  {
    id: "basic-home",
    title: "基础三餐｜家常食堂版",
    series: "基础减脂",
    source: "小红书：161 82 大家蹲的减脂食谱",
    summary: "早餐鸡蛋碳水坚果，午晚餐一荤两素配主食。",
    fit: "适合长期更稳的匀速掉秤。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 碳水 1 份 + 坚果约 15g。碳水可选馒头、包子、全麦面包、燕麦或红薯。" },
      { slot: "午餐", food: "食堂或家常菜：一荤两素，优先清淡鸡腿、鱼肉、深绿叶菜；米饭约一拳或馒头 1 个。" },
      { slot: "晚餐", food: "同午餐结构，一荤一素或一荤两素；菜太油可涮水，少随餐喝汤。" }
    ],
    rules: ["三餐不断碳，适合基础版。", "大基数可等比例加量或增加碳水。"]
  },
  {
    id: "basic-no-fire",
    title: "基础三餐｜不开火燕麦版",
    series: "基础减脂",
    source: "小红书：161 82 大家蹲的减脂食谱",
    summary: "适合宿舍或办公室：蛋白质、牛奶豆浆燕麦、坚果和蔬菜。",
    fit: "适合不想开火、想快手完成的一天。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 馒头/全麦面包/燕麦等碳水 + 坚果 15g。" },
      { slot: "午餐", food: "鸡蛋、即食鸡胸或牛肉等蛋白质 + 牛奶/豆浆燕麦粥 + 坚果 15g。" },
      { slot: "蔬菜", food: "加黄瓜、番茄等方便携带的蔬菜，水果不能完全替代蔬菜。" },
      { slot: "晚餐", food: "继续按蛋白质 + 主食/燕麦 + 蔬菜组合，控制油和酱。" }
    ],
    rules: ["不建议用燕麦奶做主蛋白。", "这版不含加餐。"]
  },
  {
    id: "basic-onepot",
    title: "基础减脂｜懒人一锅端",
    series: "基础减脂",
    source: "小红书：幸福营养减脂餐 懒人一锅端焖菜",
    summary: "番茄、包菜、洋葱焖菜，加蛋白质和碳水做成正餐。",
    fit: "适合想自己做、又不想复杂炒菜的一天。",
    meals: [
      { slot: "底菜", food: "番茄 1 个 + 包菜半个 + 洋葱半个，可加芹菜或其他味道不重的蔬菜。" },
      { slot: "蛋白质", food: "加入鸡蛋、牛肉或其他瘦肉类。" },
      { slot: "碳水", food: "可加荞麦面、意面、乌冬面或一小份主食。" },
      { slot: "做法", food: "平底锅薄水烧开，中间放少量油，蔬菜和蛋白质一起焖熟，生抽和盐调味，适当收汁。" }
    ],
    rules: ["可以作为午餐或晚餐主餐。", "油量可控，少放浓酱。"]
  },
  {
    id: "morning-liquid",
    title: "上午低食欲｜半日液断早餐替换",
    series: "基础减脂",
    source: "小红书：上午低食欲人的无痛减肥方法",
    summary: "早餐换成无糖含奶饮，午晚餐保持原本减脂内容。",
    fit: "适合上午不饿或平台期想温和调整的人。",
    meals: [
      { slot: "早餐", food: "等饿了再喝，或 10:30 左右喝：乌龙茶兑牛奶、自制拿铁、无糖奶茶粉、可可豆浆、豆浆咖啡或豆浆粉牛奶奶昔。" },
      { slot: "午餐", food: "保持原本减脂餐内容，不额外加热量。" },
      { slot: "晚餐", food: "正常减脂餐；如果睡眠不好，可把部分碳水后置到晚餐。" }
    ],
    rules: ["饮品可加生可可粉、抹茶粉、羽衣甘蓝粉、黑咖等，但不加糖。"]
  },
  {
    id: "bento-mantou",
    title: "懒人带饭｜馒头鸡蛋坚果版",
    series: "懒人带饭",
    source: "小红书：懒人带饭 干巴套餐",
    summary: "馒头、鸡蛋、坚果和低糖水果/黄瓜的上班带饭。",
    fit: "适合忙到没法做饭的工作日。",
    meals: [
      { slot: "早餐", food: "无糖饮品或鸡蛋 1 个，按当天饥饿感调整。" },
      { slot: "带饭", food: "馒头 1 个 + 鸡蛋 2 个 + 坚果约 30g。" },
      { slot: "替换", food: "减脂期把苹果换成黄瓜或低糖水果，并减少坚果。" },
      { slot: "晚餐", food: "补一份蔬菜和瘦肉，避免全天蔬菜不足。" }
    ],
    rules: ["原文是带饭思路，APP 补成全天执行版。"]
  },
  {
    id: "bento-toast",
    title: "懒人带饭｜吐司鸡蛋坚果版",
    series: "懒人带饭",
    source: "小红书：懒人带饭 干巴套餐",
    summary: "吐司、鸡蛋、坚果，配黄瓜补蔬菜。",
    fit: "适合更容易买到吐司的一天。",
    meals: [
      { slot: "早餐", food: "无糖茶、黑咖或豆浆；如果很饿可加鸡蛋 1 个。" },
      { slot: "带饭", food: "吐司 2-4 片 + 鸡蛋 2 个 + 坚果约 30g；减脂期自行减少吐司和坚果。" },
      { slot: "蔬菜", food: "有条件带黄瓜 1 根或番茄 1 个。" },
      { slot: "晚餐", food: "吃清淡热菜和蛋白质，补足蔬菜。" }
    ],
    rules: ["方便但蔬菜不足，最好加黄瓜或晚餐补菜。"]
  },
  {
    id: "takeout-light-bowl",
    title: "外卖安全日｜轻食拌饭版",
    series: "外食外卖",
    source: "小红书：外卖推荐｜麦田归来·轻食拌饭",
    summary: "早餐基础公式，午餐选鸡腿肉松豆泥拌饭，晚餐清淡收住。",
    fit: "适合当天必须点外卖但想吃得像正餐的人。",
    meals: [
      { slot: "早餐", food: "鸡蛋 1 个 + 碳水 1 份 + 坚果 15g。" },
      { slot: "午餐", food: "选热乎轻食拌饭，优先鸡腿肉松豆泥拌饭这类：有杂粮饭、肉类、豆泥，酱汁少拌。" },
      { slot: "晚餐", food: "瘦肉/鸡蛋/鱼虾 + 深色蔬菜 + 少量主食；不再加甜品。" }
    ],
    rules: ["这是外卖参考，不绑定某一家店。", "如果午餐分量很足，晚餐减主食但保留蛋白质。"]
  }
];

const pendingNotes = [
  { title: "小基数瘦20斤减脂外食or外卖吃什么", reason: "内容是 36 个餐厅/外卖选择库，不是完整全天餐单；已提炼一个外卖安全日。" },
  { title: "拼豆让我一天掉了1.2斤", reason: "更像行为触发的断食日，不适合作为稳定循环餐单。" },
  { title: "分享一个超饱腹的吃法", reason: "是防暴食组合和燕麦甜品口径，不放入全天餐单。" },
  { title: "一个瘦子外食不涨称的小tip", reason: "主要是外食顺序和配餐技巧，不是全天餐单。" },
  { title: "夏天的超低卡液断神方 / 每天一杯抑制食欲", reason: "多为饮品配方，未整理为全天餐单。" },
  { title: "燕麦球、南瓜碗、低卡甜品、调酒类", reason: "单品、甜品或饮品，不进入循环打卡。" },
  { title: "吃不腻的水煮菜 / 汤类单品", reason: "用户要求不收汤类，含汤内容已按少汤热菜处理或排除。" }
];

const planById = new Map(mealPlans.map((plan) => [plan.id, plan]));
const filters = ["全部", ...Array.from(new Set(mealPlans.map((plan) => plan.series)))];

const state = loadState();
const nodes = {
  availableCount: document.querySelector("#availableCount"),
  selectedCount: document.querySelector("#selectedCount"),
  historyTotal: document.querySelector("#historyTotal"),
  cycleTitle: document.querySelector("#cycleTitle"),
  cycleSub: document.querySelector("#cycleSub"),
  percentText: document.querySelector("#percentText"),
  activeTitle: document.querySelector("#activeTitle"),
  activeSub: document.querySelector("#activeSub"),
  slotCount: document.querySelector("#slotCount"),
  mealList: document.querySelector("#mealList"),
  autoNote: document.querySelector("#autoNote"),
  filterBar: document.querySelector("#filterBar"),
  detailPanel: document.querySelector("#detailPanel"),
  planList: document.querySelector("#planList"),
  cycleList: document.querySelector("#cycleList"),
  historyCount: document.querySelector("#historyCount"),
  historyList: document.querySelector("#historyList"),
  pendingCount: document.querySelector("#pendingCount"),
  pendingList: document.querySelector("#pendingList")
};

function defaultState() {
  return {
    selectedIds: mealPlans.map((plan) => plan.id),
    currentIndex: 0,
    completedMeals: [],
    history: [],
    filter: "全部",
    detailId: mealPlans[0]?.id || ""
  };
}

function loadState() {
  const base = defaultState();
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const selectedIds = Array.isArray(stored.selectedIds)
      ? stored.selectedIds.filter((id) => planById.has(id))
      : base.selectedIds;
    return {
      selectedIds: selectedIds.length ? selectedIds : base.selectedIds,
      currentIndex: Number.isInteger(stored.currentIndex) ? stored.currentIndex : 0,
      completedMeals: Array.isArray(stored.completedMeals) ? stored.completedMeals : [],
      history: Array.isArray(stored.history) ? stored.history : [],
      filter: filters.includes(stored.filter) ? stored.filter : "全部",
      detailId: planById.has(stored.detailId) ? stored.detailId : base.detailId
    };
  } catch {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalizeIndex() {
  if (!state.selectedIds.length) {
    state.currentIndex = 0;
    state.completedMeals = [];
    return;
  }
  if (state.currentIndex < 0) state.currentIndex = 0;
  if (state.currentIndex >= state.selectedIds.length) state.currentIndex = state.selectedIds.length - 1;
}

function activePlan() {
  normalizeIndex();
  return planById.get(state.selectedIds[state.currentIndex]);
}

function completion() {
  const plan = activePlan();
  if (!plan) return { done: 0, total: 0, percent: 0 };
  const total = plan.meals.length;
  const done = state.completedMeals.filter((slot) => plan.meals.some((meal) => meal.slot === slot)).length;
  return { done, total, percent: total ? Math.round((done / total) * 100) : 0 };
}

function render() {
  normalizeIndex();
  renderStats();
  renderActivePlan();
  renderFilters();
  renderDetail();
  renderPlanList();
  renderCycleList();
  renderHistory();
  renderPending();
  saveState();
}

function renderStats() {
  const plan = activePlan();
  nodes.availableCount.textContent = mealPlans.length;
  nodes.selectedCount.textContent = state.selectedIds.length;
  nodes.historyTotal.textContent = state.history.length;
  if (!plan) {
    nodes.cycleTitle.textContent = "未选择餐单";
    nodes.cycleSub.textContent = "先从餐单库加入想循环的餐单";
    return;
  }
  const round = Math.floor(state.history.length / Math.max(state.selectedIds.length, 1)) + 1;
  nodes.cycleTitle.textContent = `第 ${round} 轮 · ${state.currentIndex + 1}/${state.selectedIds.length}`;
  nodes.cycleSub.textContent = `${plan.series} · ${plan.summary}`;
}

function renderActivePlan() {
  const plan = activePlan();
  const progress = completion();
  nodes.percentText.textContent = `${progress.percent}%`;
  nodes.slotCount.textContent = `${progress.done}/${progress.total}`;

  if (!plan) {
    nodes.activeTitle.textContent = "今日打卡";
    nodes.activeSub.textContent = "先从餐单库选择要循环的餐单。";
    nodes.mealList.innerHTML = "";
    return;
  }

  nodes.activeTitle.textContent = plan.title;
  nodes.activeSub.textContent = plan.fit;
  nodes.mealList.innerHTML = plan.meals.map((meal) => {
    const done = state.completedMeals.includes(meal.slot);
    return `
      <button class="meal-card ${done ? "done" : ""}" data-meal="${escapeHtml(meal.slot)}" type="button">
        <span>${escapeHtml(meal.slot)}</span>
        <strong>${escapeHtml(meal.food)}</strong>
      </button>
    `;
  }).join("");
  nodes.autoNote.textContent = "打完当前餐单所有餐次后，会短暂停留并自动进入下一份所选餐单。";
}

function renderFilters() {
  nodes.filterBar.innerHTML = filters.map((filter) => `
    <button class="${state.filter === filter ? "active" : ""}" data-filter="${escapeHtml(filter)}" type="button">${escapeHtml(filter)}</button>
  `).join("");
}

function renderDetail() {
  const plan = planById.get(state.detailId) || activePlan() || mealPlans[0];
  if (!plan) {
    nodes.detailPanel.innerHTML = "";
    return;
  }
  const selected = state.selectedIds.includes(plan.id);
  nodes.detailPanel.innerHTML = `
    <span class="detail-label">详情预览</span>
    <h2>${escapeHtml(plan.title)}</h2>
    <p>${escapeHtml(plan.summary)}</p>
    <div class="meta-row">
      <span>${escapeHtml(plan.series)}</span>
      <span>${plan.meals.length} 餐次</span>
      <span>${escapeHtml(plan.source)}</span>
      <span>${selected ? "已在循环" : "未加入"}</span>
    </div>
    <div class="detail-meals">
      ${plan.meals.map((meal) => `
        <div>
          <strong>${escapeHtml(meal.slot)}</strong>
          <span>${escapeHtml(meal.food)}</span>
        </div>
      `).join("")}
    </div>
    <ul>
      ${plan.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}
    </ul>
    <div class="detail-actions">
      <button class="text-button" data-set-current="${plan.id}" type="button">设为今天打卡</button>
      <button class="text-button" data-toggle-plan="${plan.id}" type="button">${selected ? "从循环移出" : "加入循环"}</button>
    </div>
  `;
}

function renderPlanList() {
  const visiblePlans = state.filter === "全部"
    ? mealPlans
    : mealPlans.filter((plan) => plan.series === state.filter);
  nodes.planList.innerHTML = visiblePlans.map((plan) => {
    const selected = state.selectedIds.includes(plan.id);
    return `
      <article class="plan-card ${state.detailId === plan.id ? "active" : ""}">
        <button data-detail="${plan.id}" type="button">
          <span>${escapeHtml(plan.series)}</span>
          <strong>${escapeHtml(plan.title)}</strong>
          <em>${escapeHtml(plan.summary)}</em>
          <small>${plan.meals.length} 餐次 · ${escapeHtml(plan.source)}</small>
        </button>
        <button class="small-action" data-toggle-plan="${plan.id}" type="button">${selected ? "移出循环" : "加入循环"}</button>
      </article>
    `;
  }).join("");
}

function renderCycleList() {
  if (!state.selectedIds.length) {
    nodes.cycleList.innerHTML = `<p class="empty">还没有选择餐单。可以先看详情，再加入循环。</p>`;
    return;
  }
  nodes.cycleList.innerHTML = state.selectedIds.map((id, index) => {
    const plan = planById.get(id);
    if (!plan) return "";
    return `
      <article class="cycle-item ${index === state.currentIndex ? "active" : ""}">
        <button data-set-current="${plan.id}" type="button">
          <span>${index + 1}</span>
          <strong>${escapeHtml(plan.title)}</strong>
          <em>${escapeHtml(plan.series)}</em>
        </button>
        <div>
          <button aria-label="上移" data-move-up="${plan.id}" type="button">↑</button>
          <button aria-label="下移" data-move-down="${plan.id}" type="button">↓</button>
          <button aria-label="移出" data-toggle-plan="${plan.id}" type="button">×</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderHistory() {
  nodes.historyCount.textContent = `${state.history.length} 天`;
  nodes.historyList.innerHTML = state.history.length
    ? state.history.slice().reverse().slice(0, 20).map((item) => `
      <article>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.date)} · 第 ${item.round} 轮完成</span>
      </article>
    `).join("")
    : `<p class="empty">还没有完成记录。</p>`;
}

function renderPending() {
  nodes.pendingCount.textContent = `${pendingNotes.length} 个`;
  nodes.pendingList.innerHTML = pendingNotes.map((item) => `
    <article>
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.reason)}</span>
    </article>
  `).join("");
}

function toggleMeal(slot) {
  const plan = activePlan();
  if (!plan) return;
  if (state.completedMeals.includes(slot)) {
    state.completedMeals = state.completedMeals.filter((item) => item !== slot);
  } else {
    state.completedMeals.push(slot);
  }
  const allDone = plan.meals.every((meal) => state.completedMeals.includes(meal.slot));
  render();
  if (allDone) {
    window.setTimeout(() => completeCurrentPlan(plan), ADVANCE_DELAY);
  }
}

function completeCurrentPlan(plan) {
  const active = activePlan();
  if (!active || active.id !== plan.id) return;
  const round = Math.floor(state.history.length / Math.max(state.selectedIds.length, 1)) + 1;
  state.history.push({
    id: plan.id,
    title: plan.title,
    date: new Date().toLocaleDateString("zh-CN"),
    round
  });
  state.completedMeals = [];
  if (state.selectedIds.length) {
    state.currentIndex = (state.currentIndex + 1) % state.selectedIds.length;
  }
  render();
}

function setCurrent(id) {
  if (!state.selectedIds.includes(id)) state.selectedIds.push(id);
  state.currentIndex = state.selectedIds.indexOf(id);
  state.completedMeals = [];
  state.detailId = id;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function togglePlan(id) {
  if (state.selectedIds.includes(id)) {
    const removeIndex = state.selectedIds.indexOf(id);
    state.selectedIds = state.selectedIds.filter((item) => item !== id);
    if (removeIndex < state.currentIndex) state.currentIndex -= 1;
    if (removeIndex === state.currentIndex) state.completedMeals = [];
  } else {
    state.selectedIds.push(id);
  }
  normalizeIndex();
  render();
}

function movePlan(id, direction) {
  const index = state.selectedIds.indexOf(id);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= state.selectedIds.length) return;
  const currentId = state.selectedIds[state.currentIndex];
  const copy = state.selectedIds.slice();
  [copy[index], copy[next]] = [copy[next], copy[index]];
  state.selectedIds = copy;
  state.currentIndex = state.selectedIds.indexOf(currentId);
  render();
}

function undoLast() {
  const last = state.history.pop();
  if (!last) return;
  const index = state.selectedIds.indexOf(last.id);
  if (index >= 0) state.currentIndex = index;
  state.completedMeals = [];
  render();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;
  if (target.dataset.meal) toggleMeal(target.dataset.meal);
  if (target.dataset.filter) {
    state.filter = target.dataset.filter;
    render();
  }
  if (target.dataset.detail) {
    state.detailId = target.dataset.detail;
    render();
  }
  if (target.dataset.togglePlan) togglePlan(target.dataset.togglePlan);
  if (target.dataset.setCurrent) setCurrent(target.dataset.setCurrent);
  if (target.dataset.moveUp) movePlan(target.dataset.moveUp, -1);
  if (target.dataset.moveDown) movePlan(target.dataset.moveDown, 1);
});

document.querySelector("#addAllBtn").addEventListener("click", () => {
  state.selectedIds = mealPlans.map((plan) => plan.id);
  normalizeIndex();
  render();
});

document.querySelector("#clearCycleBtn").addEventListener("click", () => {
  state.selectedIds = [];
  state.currentIndex = 0;
  state.completedMeals = [];
  render();
});

document.querySelector("#undoBtn").addEventListener("click", undoLast);

document.querySelector("#resetBtn").addEventListener("click", () => {
  if (!window.confirm("确认清空全部打卡记录和循环选择？")) return;
  Object.assign(state, defaultState());
  render();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js?v=20260722m1");
  });
}

render();
