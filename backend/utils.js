import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    },
     process.env.JWT_SECRET || 'somethingsecret',
      {
        expiresIn: '30d', 
      }
    );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX - GETS RIDE OF BEARER APART AND RETURNS TOKEN PORTION 
    jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) => {
      if(err) {
        res.status(401).send({message: 'Invalid Token! '});
      } else {
        // at this point token is correct
        req.user = decode;
      }
    }
   ) ;
  } else {
    res.status(401).send({ message: 'No Token! '});
  }
}