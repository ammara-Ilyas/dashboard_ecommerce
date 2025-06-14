"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { callPublicApi } from "@/libs/callApis";
const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [weightsList, setWeightsList] = useState([]);
  const [ramList, setRamList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  // const [products, setProducts] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [orderList, setorderList] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Forms
  const [categoryForm, setCategoryForm] = useState({
    id: null,
    name: "",
    color: "",
    image: "",
  });
  const [subCategoryForm, setSubCategoryForm] = useState({
    id: null,
    category: "",
    name: "",
  });
  const [bannerForm, setBannerForm] = useState({
    id: null,
    name: "",
    image: "",
  });
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [
          catRes,
          weightRes,
          ramRes,
          bannerRes,
          sizeRes,
          orderRes,
          userRes,
          reviewRes,
        ] = await Promise.all([
          callPublicApi("/category", "GET"),
          // callPublicApi("/subcategory", "GET"),
          callPublicApi("/weight", "GET"),
          callPublicApi("/ram", "GET"),
          callPublicApi("/banners", "GET"),
          callPublicApi("/size", "GET"),
          callPublicApi("/orders", "GET"),
          callPublicApi("/auth/users", "GET"),
          callPublicApi("/reviews", "GET"),
        ]);

        if (catRes?.categories) {
          setCategories(catRes.categories);
        }

        if (sizeRes?.sizes) {
          setSizeList(sizeRes.sizes);
        }
        if (weightRes?.weights) {
          setWeightsList(weightRes.weights);
        }

        if (ramRes?.rams) {
          setRamList(ramRes.rams);
        }

        if (bannerRes?.banners) {
          setBannerList(bannerRes.banners);
        }
        if (orderRes?.orders) {
          setorderList(orderRes.orders);
        }
        if (userRes?.users) {
          setUsers(userRes.users);
        }
        if (reviewRes?.reviews) {
          setReviews(reviewRes.reviews);
        }
      } catch (err) {
        toast.error("❌ Fetch error:" || err?.message || err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);
  // useEffect(() => {

  // }, [ramList, sizeList, weightsList, categories]);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        subCategories,
        setSubCategories,
        weightsList,
        ramList,
        sizeList,
        setRamList,
        setWeightsList,
        setSizeList, // products,
        bannerList,
        loading,
        setLoading,
        categoryForm,
        setCategoryForm,
        subCategoryForm,
        setSubCategoryForm,
        bannerForm,
        setBannerForm,
        isSidebarOpen,
        orderList,
        setorderList,
        setReviews,
        setUsers,
        users,
        reviews,
        toggleSidebar,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
