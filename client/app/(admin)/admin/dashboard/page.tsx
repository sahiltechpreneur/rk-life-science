export default function AdminDashboard(){

 return(

 <div>

 <h1 className="text-3xl font-bold text-green-700 mb-8">
 Admin Dashboard
 </h1>

 <div className="grid grid-cols-4 gap-6">

 <div className="bg-white shadow p-6 rounded">
 <h2>Total Products</h2>
 <p className="text-2xl font-bold">120</p>
 </div>

 <div className="bg-white shadow p-6 rounded">
 <h2>Total Users</h2>
 <p className="text-2xl font-bold">340</p>
 </div>

 <div className="bg-white shadow p-6 rounded">
 <h2>Total Orders</h2>
 <p className="text-2xl font-bold">85</p>
 </div>

 <div className="bg-white shadow p-6 rounded">
 <h2>Total Revenue</h2>
 <p className="text-2xl font-bold">Rs 120000</p>
 </div>

 </div>

 </div>

 )
}