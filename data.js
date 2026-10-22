export const categories = [
  {id:'bowl',name:'谷物能量碗',time:'15–20',image:'chicken-bowl'},
  {id:'rice',name:'暖食焖饭',time:'12–15',image:'warm-chicken'},
  {id:'wrap',name:'多多卷',time:'5–10',image:'wrap-fresh'},
  {id:'panini',name:'帕尼尼',time:'5–8',image:'panini-fresh'},
  {id:'salad',name:'鲜蔬沙拉',time:'10–15',image:'pumpkin-salad'},
  {id:'drink',name:'小食饮品',time:'3–12',image:'juice'}
];
export const moods = [
  {id:'happy',name:'开心',icon:'smile',description:'好心情，也要吃得丰盛满足。'},
  {id:'tired',name:'疲惫',icon:'moon',description:'一份暖食，给自己一点温柔。'},
  {id:'treat',name:'想犒劳自己',icon:'gift',description:'今天值得，给自己一点小满足。'},
  {id:'light',name:'清淡',icon:'leaf',description:'为你挑选轻盈清爽的菜品。'},
  {id:'rich',name:'重口',icon:'flame',description:'让浓郁风味，唤醒今天的食欲。'},
  {id:'appetite',name:'没胃口',icon:'sun',description:'来点清爽开胃的，慢慢找回食欲。'}
];
export const conditions = [
  {id:'quick',name:'赶时间',icon:'clock'},
  {id:'lean',name:'减脂',icon:'activity'},
  {id:'protein',name:'增肌',icon:'strength'},
  {id:'warm',name:'想吃暖的',icon:'bowl'},
  {id:'cool',name:'想吃凉的',icon:'snow'},
  {id:'family',name:'儿童/孕妈妈',icon:'heart'}
];
// Names and prices follow the supplied XMind, not conflicting screenshot examples.
// Times below are category averages, not invented individual preparation times.
export const products = [
  {id:'chicken',name:'香草鸡胸谷物碗',category:'bowl',price:42,image:'chicken-bowl',desc:'烤鸡胸 / 牛油果 / 藜麦',tags:['谷物','丰盛'],moods:['happy'],states:['lean','protein'],words:['鸡胸','鸡肉','牛油果','藜麦'],reason:'丰盛谷物与烤鸡胸，好好吃一餐。'},
  {id:'warmchicken',name:'香烤鸡胸暖碗',category:'rice',price:39,image:'warm-chicken',desc:'暖食焖饭',tags:['暖食'],moods:['tired'],states:['warm','protein'],words:['鸡胸','鸡肉'],reason:'暖暖一碗，让疲惫暂停一下。'},
  {id:'vegrice',name:'时蔬糙米饭',category:'rice',price:32,image:'vegetable-rice',desc:'时蔬 / 糙米',tags:['暖食'],moods:['light'],states:['warm','family'],words:['素食','蔬菜','糙米'],reason:'简单的时蔬糙米，清淡又温暖。'},
  {id:'korean',name:'韩式拌饭',category:'rice',price:38,image:'korean-rice',desc:'韩式风味',tags:['丰盛'],moods:['happy','rich'],states:['warm'],words:['韩式','饭'],reason:'丰富口感，给今天加一点好心情。'},
  {id:'beef',name:'日式牛肉饭',category:'rice',price:40,image:'beef-rice',desc:'日式风味 / 牛肉',tags:['暖食'],moods:['happy'],states:['warm','protein'],words:['牛肉','饭'],reason:'暖食与浓郁牛肉风味，吃得满足。'},
  {id:'wrap',name:'牛油果多多卷',category:'wrap',price:28,image:'wrap-fresh',desc:'牛油果 / 蔬菜 / 全麦卷',tags:['全麦'],moods:['treat'],states:['quick'],words:['牛油果','素食','全麦'],reason:'轻松一卷，也值得好好犒劳自己。'},
  {id:'panini',name:'全麦帕尼尼',category:'panini',price:26,image:'panini-fresh',desc:'番茄 / 马苏里拉',tags:['全麦'],moods:['treat'],states:['quick','family'],words:['全麦','番茄','奶酪','素食'],reason:'香脆全麦，给忙碌一点美味。'},
  {id:'toast',name:'牛油果吐司',category:'panini',price:25,image:'toast',desc:'牛油果泥 / 溏心蛋',tags:['吐司'],moods:['treat'],states:['quick','family'],words:['牛油果','蛋','素食'],reason:'牛油果与吐司，简单的小满足。'},
  {id:'pumpkin',name:'烤南瓜藜麦沙拉',category:'salad',price:36,image:'pumpkin-salad',desc:'烤南瓜 / 藜麦',tags:['沙拉'],moods:['light'],states:['lean','cool'],words:['南瓜','藜麦','素食'],reason:'今天适合来份烤南瓜藜麦沙拉。'},
  {id:'chickpea',name:'地中海鹰嘴豆沙拉',category:'salad',price:37,image:'chickpea-salad',desc:'地中海风味 / 鹰嘴豆',tags:['沙拉'],moods:['light','appetite'],states:['cool'],words:['鹰嘴豆','素食'],reason:'清爽地中海风味，轻盈吃一餐。'},
  {id:'thaisalad',name:'泰式牛肉沙拉',category:'salad',price:42,image:'thai-salad',desc:'牛肉 / 泰式风味（轻辣）',tags:['轻辣'],moods:['rich'],states:['cool'],words:['牛肉','泰式'],reason:'轻辣的泰式风味，唤醒好食欲。'},
  {id:'potatoes',name:'香草烤薯角',category:'drink',price:18,image:'potatoes',desc:'香草风味',tags:['小食'],moods:['rich'],states:['quick'],words:['薯角','素食','土豆'],reason:'香草烤薯角，给一餐加点风味。'},
  {id:'yogurt',name:'酸奶莓果杯',category:'drink',price:22,image:'berry-yogurt',desc:'酸奶 / 莓果',tags:['小食'],moods:['treat'],states:['quick'],words:['酸奶','莓果','素食'],reason:'莓果酸奶，让今天甜一点。'},
  {id:'lemon',name:'柠檬薄荷气泡饮',category:'drink',price:16,image:'lemon',desc:'柠檬 / 薄荷 / 气泡饮',tags:['饮品'],moods:['appetite'],states:['quick'],words:['柠檬','薄荷','素食'],reason:'清爽气泡，开胃又轻松。'},
  {id:'latte',name:'燕麦拿铁',category:'drink',price:20,image:'oat-latte',desc:'燕麦拿铁',tags:['饮品'],moods:['tired'],states:['quick'],words:['咖啡','燕麦','素食'],reason:'温柔的拿铁，陪你缓一缓。'},
  {id:'juice',name:'鲜榨果汁',category:'drink',price:15,image:'juice',desc:'鲜榨果汁',tags:['饮品'],moods:['light','appetite'],states:['quick'],words:['果汁','素食'],reason:'来一杯鲜榨果汁，清爽一下。'}
];
export const dietaryTags=['免辣','微辣','加辣','不要香菜','不要葱','不要蒜','去洋葱','少盐','少油','少糖'];
export const orderTags=['全部少油','孕妇/儿童餐','共同过敏源'];
export const byId=id=>products.find(p=>p.id===id);
export const categoryOf=p=>categories.find(c=>c.id===p.category);
export const money=n=>`¥${Number(n).toFixed(2).replace(/\.00$/,'')}`;
export function matches(p,{query='',mood='',states=[]}={}){
  const q=query.trim().toLowerCase();
  return (!q||[p.name,p.desc,...p.words].join(' ').toLowerCase().includes(q))&&(!mood||p.moods.includes(mood))&&states.every(s=>p.states.includes(s));
}
export const cartTotal=cart=>cart.reduce((n,line)=>n+byId(line.id).price*line.quantity,0);
export const cartCount=cart=>cart.reduce((n,line)=>n+line.quantity,0);
