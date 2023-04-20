(function (Scratch) {
    'use strict';
    const icon = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';
    const icon2 = 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png';
    class JavaScript {
        constructor () {}
        getInfo() {
            return {
                id: 'ElliNet13JavaScript,
                name: 'JavaScript',
                color1: '#808080',
                color2: '#8c8c8c',
                color3: '#999999',
                menuIconURI: icon,
                blockIconURI: icon2,
                blocks: [
                    {
                        opcode: 'Timeroff',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Run [string] in JavaScript',
                        arguments: {
                            string: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'console.log('Hello World")'
                            }
                        }
                    },
                ]
            };
        }
        run ({string}) {
            eval(string)
        }
    }
    Scratch.extensions.register(new JavaScript());
})(Scratch);
