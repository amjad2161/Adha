const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(/question:\s*"([^"]+)"/g, (match, q) => {
    let category = "معلومات عامة";
    if (q.includes("الحج") || q.includes("حجاج") || q.includes("مكة") || q.includes("طواف") || q.includes("زمزم") || q.includes("سعي") || q.includes("مزدلفة") || q.includes("عرفة") || q.includes("إحرام") || q.includes("الكعبة") || q.includes("جمرات") || q.includes("تلبية")) {
        category = "الحج والعمرة";
    } else if (q.includes("الأضحى") || q.includes("العيد") || q.includes("الأضحية") || q.includes("نحر") || q.includes("أيام التشريق") || q.includes("التشريق")) {
        category = "العيد والأضحية";
    } else if (q.includes("إبراهيم") || q.includes("إسماعيل") || q.includes("هاجر") || q.includes("نبي")) {
        category = "قصص الأنبياء";
    }
    return `question: "${q}", category: "${category}"`;
});

fs.writeFileSync('src/data.ts', data);
