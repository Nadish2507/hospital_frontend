import { useEffect, useState } from "react";
import { getPharmacy, saveMedicine } from "../../services/dbService";
import AdminSidebar from "../../components/AdminSidebar";
import "./manage.css";

const ManagePharmacy = () => {
  const [pharmacy, setPharmacy] = useState([]);
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    setPharmacy(getPharmacy());
  }, []);

  const handleAddMedicine = (e) => {
    e.preventDefault();

    const newMed = {
      id: Date.now(),
      name,
      stock,
      price,
    };

    saveMedicine(newMed);

    setPharmacy(getPharmacy());
    setName("");
    setStock("");
    setPrice("");
  };

  return (
    <div className="manage-wrapper">
      <AdminSidebar />

      <div className="manage-content">
        <h2 className="manage-title">Manage Pharmacy</h2>

        <form className="manage-form" onSubmit={handleAddMedicine}>
          <input
            type="text"
            placeholder="Medicine Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            placeholder="Stock Qty"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button>Add Medicine</button>
        </form>

        <div className="manage-list">
          {pharmacy.map((m) => (
            <div className="manage-item" key={m.id}>
              <span>
                {m.name} — Stock: {m.stock} — ₹{m.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagePharmacy;
