
const paragraphs = [{"context":"从古至今，天文学都是人类文明中不可或缺的重要学科，因为它与人类息息相关。昼夜交替，四季循环，人类自从诞生以来，无时无刻不在接触天文现象。明亮的太阳、皎洁的月光、灿烂的群星、壮观的日食……让我们产生了无数疑问：我们生活的地球在宇宙中是什么样的？太阳为什么会发出光和热？夜空中闪烁的星星是什么？除了地球之外，其他星球上还有没有生命？有没有外星人？彗星和小行星真会与地球相撞吗？宇宙到底有多大？宇宙是怎么产生的？……这些问题引起了人们的极大兴趣。","id":0,"qas":[],"title":"为什么要研究天文学"},{"context":"古代人们在从事农牧业生产时，很早就懂得了利用天象来确定季节。古代的渔民和水手在茫茫大海上利用星星确定自己航行的方向，利用月亮的圆缺变化来判断潮水的涨落……","id":1,"qas":[{answer_start:20, text:"利用天象"}],"title":"为什么要研究天文学"},{"context":"现代科学技术的发展对天文学有了更多新的需求，天文学得到了飞速的发展。","id":2,"qas":[],"title":"为什么要研究天文学"},{"context":"天文台编制的各种历表，不仅满足了人们日常生活的应用，而且更是航海、航空、大地测量、科学研究等部门迫切需要的。生活中离不开时间，近代科学更需要测定和记录精确的时间，天文台就承担了测定标准时间和提供时间服务的工作。","id":3,"qas":[],"title":"为什么要研究天文学"}]

function merge(from,to) {
    let to_p = paragraphs[to];
    let from_p = paragraphs[from];
    const len = to_p.context.length;
    to_p.context+=from_p.context;
    from_p.qas.forEach(item => {
        item.answer_start += len;
        to_p.qas.push(item)
    })
    paragraphs[from] = null
    return to_p
}
res = merge(1,0);
console.log(paragraphs, res.qas[0],res.context.substring(res.qas[0].answer_start))
