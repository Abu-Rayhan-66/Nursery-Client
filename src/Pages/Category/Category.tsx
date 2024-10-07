

const Category = () => {
    return (
        <div className="max-w-7xl mx-auto mb-10 bg-[#f4f2ee]">
        <h2 className="text-3xl font-semibold text-center mb-6  uppercase">Top Category</h2>
        <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-4 mx-4">
            <div>
            <img src="https://i.ibb.co.com/QFjbG6W/mbn-7.jpg" alt="" />
            <h2 className="ml-3 text-xl font-medium">Bonsai</h2>
            
            </div>
            <div>
            <img src="https://i.ibb.co.com/4ZkLss2/daisey-flowers-Getty-Images-1297653483-c905af6eaa9044378988a1316b7f01d7.jpg" alt="" />
            <h2 className="ml-3 text-xl font-medium">Flower</h2>
            
            </div>
            <div>
            <img className="h-[270px]" src="https://i.ibb.co.com/PwDQCHW/benefits-evergreens-thuja-hedge-privacy-indianapolis.jpg" alt="" />
            <h2 className="ml-3 text-xl font-medium">Evergreen Trees</h2>
            </div>
            <div>
            <img className="h-[270px]" src="https://i.ibb.co.com/s9tkJzS/maxresdefault.jpg" alt="" />
            <h2 className="ml-3 text-xl font-medium">Cactus</h2>
            </div>
            <div>
            <img className="h-[270px]" src="https://i.ibb.co.com/WKk2WsG/Qb-Sc8-Ej-Yi-B52-S4-Xm-L2f-Hf7-1200-80.jpg" alt="" />
            <h2 className="ml-3 text-xl font-medium">Dwarf Trees</h2>
         
            </div>
           <div>
           <img className="h-[270px]" src="https://i.ibb.co.com/ZdjHr6g/Weeping-Fig.jpg" alt="" />
           <h2 className="ml-3 text-xl font-medium">Air-Purifying Trees</h2>
         
           </div>
        </div>
    </div>
    );
};

export default Category;