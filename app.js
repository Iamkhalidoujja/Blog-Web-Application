//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");


const homeStartingContent = "Lorem ipsum dolor sit amet. Aut laudantium aliquam et eaque alias a dolorem alias sed recusandae optio non autem quibusdam quo doloribus error? Nam ipsum facere vel consequuntur molestias vel eaque ipsam ut repellat asperiores sit omnis nemo sed amet aperiam est aliquid aliquid! Est ducimus doloremque ea quae expedita a voluptas explicabo. Qui fuga minus et rerum cumque ea eaque dolor ut sunt quisquam et ipsum voluptates et iure dolores? Aut galisum quaerat sit voluptatem laudantium qui vitae eaque. Id atque similique est officia facere et molestiae aspernatur. Est voluptas obcaecati qui recusandae corporis est eligendi quis? Qui dolor rerum sed sunt autem ut eveniet alias. Ad numquam et rerum odit est sunt quos in culpa quibusdam in dolor maxime et consequatur quia ea galisum aliquid.";
const aboutContent = "Lorem ipsum dolor sit amet. Qui doloribus sapiente ut repellendus provident et Quis error id modi fugit 33 soluta quis. Non eveniet accusamus id aperiam impedit nam corrupti quia sed amet laborum. Aut sint nemo et natus laborum vel earum quod est voluptatum enim ut fugiat ratione ea beatae ipsa aut quae quis! In distinctio alias ea exercitationem modi et beatae dolorem sit rerum tenetur qui omnis voluptatum ut natus id aspernatur assumenda? Et explicabo neque qui atque sint sit voluptas minus ea fuga dolore aut voluptatum dolores. In eveniet minus et deserunt numquam aut corrupti dignissimos ex debitis nesciunt? Est esse obcaecati ea consequatur quidem quo dolores esse eum fugiat unde. Ad rerum autem et quibusdam accusamus vel voluptatem dolorem sit voluptas placeat 33 quidem voluptatem sit tempora sint. Vel galisum suscipit et officia recusandae est alias voluptatum et fugiat dolor id beatae blanditiis quo quod placeat sed nesciunt illo.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://KhalidOUJJA:tinejdad00ENS@cluster0.b6d6rci.mongodb.net/blogDB", {useNewUrlParser : true});

const postSchema = {
  title : String,
  content : String
};
const Post = mongoose.model("Post", postSchema);

// let posts = [];

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("Where Great Ideas Find You", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post =  new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res){
  const requestedPostId = req.params.postId;

  Post.findOne({_id : requestedPostId}, function(err, post){
    res.render("post", {
      title : post.title,
      content : post.content
    });
  });

  //
  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //
  //   if (storedTitle === requestedTitle) {
  //     res.render("post", {
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });

});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully.");
});


// Website's URL: https://powerful-ocean-73888.herokuapp.com/
