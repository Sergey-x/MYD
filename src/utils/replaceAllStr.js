export default function replaceAllStr(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}


function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}
