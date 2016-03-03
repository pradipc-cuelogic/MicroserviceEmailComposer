exports.handler = function(event, context) {
    console.log("inside the handler of bulk email composer");
    context.done(null, "success");
}