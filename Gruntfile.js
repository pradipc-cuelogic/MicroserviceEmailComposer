var grunt = require('grunt');
require('load-grunt-tasks')(grunt);
require('time-grunt')(grunt);

var srcFiles = [ '*.js', 'src/*.js', 'test/*.js', 'src/*/*.js' ];

grunt.initConfig({
    lambda_invoke: {
        default: {
            options: {
                file_name: 'MicroserviceEmailComposer.js',
                event: 'test/eventInsert.json'
            }
        }
    },
    lambda_deploy: {
        default: {
            function: 'MicroserviceEmailComposer',
            arn: process.env.MICROSERVICE_EMAIL_COMPOSER_ARN
        }
    },
    lambda_package: {
        default: {
        }
    },
    jscs: {
        src: srcFiles,
        options: {
            "esnext": true, // If you use ES6 http://jscs.info/overview.html#esnext
            "verbose": true, // If you need output with rule names http://jscs.info/overview.html#verbose
            "reporter": "console",
            "requireCurlyBraces": [ "if", "else", "for", "while", "do" ],
            "requireSpaceAfterKeywords": [ "if", "else", "for", "while", "do", "switch", "return" ],
            "requireSpacesInFunctionExpression": {
                "beforeOpeningCurlyBrace": true
            },
            "requireSpacesInConditionalExpression": true,
            "disallowSpacesInFunctionExpression": {
                "beforeOpeningRoundBrace": true
            },
            "requireMultipleVarDecl": true,
            "requireSpacesInsideObjectBrackets": "all",
            "requireSpacesInsideArrayBrackets": "all",
            "requireSpaceBeforeBinaryOperators": [ "+", "-", "/", "*", "=", "==", "===", "!=", "!==" ],
            "disallowSpaceAfterPrefixUnaryOperators": [ "++", "--", "+", "-" ],
            "disallowSpaceBeforePostfixUnaryOperators": [ "++", "--" ],
            "disallowKeywords": [ "with" ],
            "disallowMultipleLineBreaks": true,
            "disallowKeywordsOnNewLine": [ "else" ],
            "requireLineFeedAtFileEnd": true,
            "disallowSpaceAfterObjectKeys": true,
            "validateLineBreaks": "LF"
        }
    },
    mocha_istanbul: {
        src: [ "./test/*.js", "./test/*/*.js" ],
        options: {
            mask: "*.js",
            check: {
                lines: 80,
                statements: 80,
                branches: 80,
                functions: 80
            }
        }
    },
    istanbul_check_coverage: {
        default: {
            options: {
                coverageFolder: "coverage*" // will check both coverage folders and merge the coverage results
            }
        }
    },
});

grunt.registerTask('deploy', [ 'jscs', 'lambda_package', 'lambda_deploy' ]);
grunt.registerTask('test', [ 'jscs', 'mocha_istanbul' ]);
grunt.registerTask('default', ['lambda_invoke' ]);
