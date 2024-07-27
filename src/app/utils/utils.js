function formatNumber(inputNumber) {
    // Chuyển đổi số thành chuỗi
    var inputString = inputNumber.toString();
    var length = inputString.length;
    var dotCount = Math.floor((length - 1) / 3);
    i;
    var parts = inputString.split("");
    for (var i = 1; i <= dotCount; i++) {
        parts.splice(length - i * 3, 0, ".");
    }
    var outputString = parts.join("");
    return outputString;
}

export default formatNumber;
