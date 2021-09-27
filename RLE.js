let fs = require('fs');
let arg = process.argv;
let index = 0, counter = 1;
let Text;
let str = "";
if (arg[2] == "code" || arg[2] == "Code") {
    fs.readFile(arg[3], (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        Text = data.toString();
        console.log("Изначальная строка:" + Text);
        while (index < Text.length) {
            while (Text.charAt(index) == Text.charAt(index + counter)) {
                counter++;
                if (counter == 255) {
                    str += "#" + String.fromCharCode(255) + Text.charAt(index);
                    index += 255
                    counter = 1;
                }
            }
            if (counter > 3 || Text.charAt(index) == "#") {
                str += "#" + String.fromCharCode(counter) + Text.charAt(index);
                index += counter;
                counter = 1;
            } else {
                for (let s = 0; s < counter; s++) {
                    str += Text.charAt(index)
                }
                index += counter;
                counter = 1;
            }
        }
        fs.writeFile(arg[4], str, (err) => {
            if (err) {
                console.error(err)
                return;
            }
            console.log("Закодированая строка:" + str);
            console.log("Файл успешно сохранен!");
        });
    })

} else if (arg[2] == "decode" || arg[2] == "Decode") {
    fs.readFile(arg[3], (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        Text = data.toString();
        console.log("Закодировання строка:" + Text);
        while (index < Text.length) {
            if (Text.charAt(index) == "#") {
                index += 2;
                for (let s = 0; s < Text.charCodeAt(index - 1); s++) {
                    str += Text.charAt(index);
                }
            } else {
                str += Text.charAt(index);
            }
            index++;
        }
        fs.writeFile(arg[4], str, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Раскодированная строка:" + str);
            console.log("Файл успешно сохранен!");
        })
    })

} else {
    console.log("Error!");
}