{
    console.log("comments");
    let createcomment = function(post_id){
        let newcommentform = $('#post-comments');
        newcommentform.submit(function(e){
            console.log("comments2");
            e.preventDefault();
            console.log("comments3");
        })
    }
    createcomment();
}