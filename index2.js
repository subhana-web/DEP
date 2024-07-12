const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());

const sequelize = new Sequelize('blog_db', 'root', 'task12345678+', {
  host: 'localhost',
  dialect: 'mysql'
});

// Define models
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

const BlogPost = sequelize.define('BlogPost', {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false }
});

const Comment = sequelize.define('Comment', {
  comment: { type: DataTypes.TEXT, allowNull: false }
});

// Define relationships
User.hasMany(BlogPost, { foreignKey: 'user_id' });
BlogPost.belongsTo(User, { foreignKey: 'user_id' });

BlogPost.hasMany(Comment, { foreignKey: 'post_id' });
Comment.belongsTo(BlogPost, { foreignKey: 'post_id' });

Comment.belongsTo(User, { foreignKey: 'user_id' });

// Sync models with database
sequelize.sync({ alter: true }).then(() => {
  console.log('Database & tables created!');
});

// Routes
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.post('/posts', async (req, res) => {
  const post = await BlogPost.create(req.body);
  res.json(post);
});

app.get('/posts', async (req, res) => {
  const posts = await BlogPost.findAll();
  res.json(posts);
});

app.put('/posts/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  post.update(req.body);
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const post = await BlogPost.findByPk(req.params.id);
  post.destroy();
  res.json({ message: 'Post deleted' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
