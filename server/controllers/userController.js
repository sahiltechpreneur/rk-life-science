const pool = require("../config/db")

exports.getUserProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: No user ID provided" });
    }

    const result = await pool.query(
      "SELECT id, fname, lname, email, phone, image FROM users WHERE id=$1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found in system" });
    }

    const user = result.rows[0];

    // Fetch orders associated with this user's email
    let orders = [];
    try {
      const ordersResult = await pool.query(
        "SELECT id, total, status, TO_CHAR(created_at, 'Mon DD, YYYY') as created_at FROM orders WHERE email=$1 ORDER BY id DESC",
        [user.email]
      );
      orders = ordersResult.rows;
    } catch (orderErr) {
      console.error("Degraded experience: Failed to fetch orders for profile", orderErr);
      // We still return the user profile even if orders fail to load
    }

    user.orders = orders;
    res.json(user);

  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ error: "Internal server error while fetching profile. Please try again later." });
  }
}


exports.updateUserProfile = async(req,res)=>{

 const {fname,lname,email,phone} = req.body

 try{

  const result = await pool.query(
   "UPDATE users SET fname=$1,lname=$2,email=$3,phone=$4 WHERE id=$5 RETURNING id,fname,lname,email,phone,image",
   [fname,lname,email,phone,req.user.id]
  )

  res.json(result.rows[0])

 }catch(err){
  res.status(500).json({error:err.message})
 }

}


exports.deleteUser = async(req,res)=>{

 try{

  await pool.query(
   "DELETE FROM users WHERE id=$1",
   [req.user.id]
  )

  res.json({message:"Account deleted"})

 }catch(err){
  res.status(500).json({error:err.message})
 }

}

exports.uploadProfileImage = async(req,res)=>{

  try{
    if(!req.file){
      return res.status(400).json({error:"No image provided"})
    }

    const imageUrl = req.file.path // Cloudinary URL

    const result = await pool.query(
      "UPDATE users SET image=$1 WHERE id=$2 RETURNING image",
      [imageUrl, req.user.id]
    )

    res.json({ imageUrl: result.rows[0].image })

  }catch(err){
    res.status(500).json({error:err.message})
  }

}

exports.getAllUsers = async(req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, fname, lname, email, phone, role, TO_CHAR(created_at, 'Mon DD, YYYY') as join_date FROM users ORDER BY created_at DESC"
    )
    res.json(result.rows)
  } catch(err) {
    res.status(500).json({error: err.message})
  }
}