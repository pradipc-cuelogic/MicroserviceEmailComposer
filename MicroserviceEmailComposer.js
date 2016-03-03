exports.handler = function(event, context) {
    console.log("inside the handler of bulk email composer");
    console.log(JSON.stringify(event, null, 2))
    context.done(null, "success");
}