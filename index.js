const express= require('express');
const app= express();
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const adminRoutes= require('./routes/admin-route');
const userRoutes= require('./routes/user-route');
const port=3000;

app.use(bodyParser.json());

//Routing
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/user',userRoutes);

// Error Handling
app.use((req,res,next) => {
  const error = new HttpError('Page not found',404);
  throw error;
});

app.use((error, req, res, next) => {
  res.status(error.code);
  res.json({message: error.message || 'Unknown error occured' , code: error.code });
});


mongoose.connect('mongodb+srv://charuMathur:charuMathur@blog.bkirm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{
  useUnifiedTopology:true,
  useNewUrlParser:true
}).then(()=>{
  app.listen((port),()=>{
    console.log(`API running at https://localhost:${port}`);
  })
}).catch((err)=>{
  console.log(err);
})