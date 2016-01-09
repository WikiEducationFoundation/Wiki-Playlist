export function moveArrayItem(arr, from, to) {
    if (to >= arr.length) {
        var k = to - arr.length;
        while ((k--) + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
}