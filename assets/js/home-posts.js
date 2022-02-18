{
    // method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new_post_form');
        $('#new_post_form').submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/post/createposts',
                data: newPostForm.serialize(),
                success: function (data) {
                    console.log(data);
                    let NewPost = newPostDOM(data.data.post);
                    $(".post-user-conatiner > .list").prepend(NewPost);
                    deletePost($('.delete-button'), NewPost);
                    new createcomment(data.data.post._id);
                    new Noty({
                        theme : "relax",
                        text: "post successfull!!",
                        type: "success",
                        layout : "topRight",
                        timeout:1500

                        }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            })
        })
    }

    let newPostDOM = function (post) {
       // console.log(post.user.email, post);
      // console.log("hello",user.email, post);
        return $(`<div id="post-${post._id}">
    <div class="email">
        ${post.user.email}
    </div>
    <div class="name">
        ${post.user.name}
    </div>
</div>
<div class="post-details">
    <div class="Posts">
            ${post.content}
    </div>
   
        <a class="delete-button" href="/post/destroy/${post._id}">delete</a>
            <div class="comments">
                    <form action="/comment/comments" method="post" id="post-comments">
                        <input type="text" id="post-comments" name="comment" placeholder="type here..">
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="add comment">
                    </form>
      
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id}">
                            </ul>
                        </div>
            </div>
</div>`)
    }
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                console.groupCollapsed("elete");
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();
            }, error: function (error) {
                console.log(error.responseText);
            }
        })
    })
}

createPost();
}