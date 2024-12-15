"use client";
import Button from "@/components/miniComponents/Button";
const Header = ({ title, breadcrumb, addBtn }) => {
  return (
    <div className="flex justify-between mt-5  items-center px-6 py-4 bg-white shadow-md w-[95%] mx-auto  rounded-xl border-[1px]">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      <div className="text-sm text-gray-600">
        {breadcrumb.map((crumb, index) => (
          <span key={index} className="inline-block">
            <span className="hover:text-blue-500 text-black cursor-pointer transition-all ease-in-out duration-300">
              {crumb}
            </span>
            {index < breadcrumb.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </span>
        ))}
        {addBtn ? (
          <>
            <Button title={addBtn.title} handleButton={addBtn.handleButton} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;
