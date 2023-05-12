import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

const SalesContext = createContext();

// eslint-disable-next-line react/prop-types
export const SalesProvider = ({ children }) => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [sales, setSales] = useState([]);

  const auth = getAuth();

  const fetchSales = async () => {
    try {
      const idToken = await getIdToken(auth.currentUser);
      console.log(idToken);

      const response = await fetch("http://localhost:3000/sales", {
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
      });

      if (!response) {
        throw new Error("Server respondend with an error");
      }

      const sales = await response.json();
      console.log("Server response:", sales);

      return setSales(sales);
    } catch (error) {
      console.log("Error fetching sales:", error);
    }
  };

  const addSale = async () => {
    try {
      const idToken = await getIdToken(auth.currentUser);

      const response = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        body: JSON.stringify({
          customer: customer,
          items: [
            {
              product: product,
              quantity: quantity,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        fetchSales();
      }
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchSales();
      }
      return () => unsubscribe();
    });
  }, []);

  return (
    <SalesContext.Provider
      value={{
        sales,
        setSales,
        fetchSales,
        customer,
        setCustomer,
        product,
        setProduct,
        totalAmount,
        setTotalAmount,
        quantity,
        setQuantity,
        addSale,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSalesContext = () => {
  const context = useContext(SalesContext);

  if (context === undefined) {
    throw new Error("useSalesContext must be used within a SalesProvider");
  }

  return context;
};
