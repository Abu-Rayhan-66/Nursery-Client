import { Link, NavLink } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { RootState } from "../../Redux/store";
import { useAppSelector } from "../../Redux/hooks";

const Navbar = () => {

  const cartData = useAppSelector((state: RootState) => state.cart.items);

  const navigationButton = (
    <>
      <h2 className="text-white font-medium uppercase text-lg m-3">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1"
              : ""
          }
        >
          home
        </NavLink>
      </h2>
      <h2 className="text-white font-medium uppercase text-lg m-3">
        <NavLink
          to="/about"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1"
              : ""
          }
        >
          about
        </NavLink>
      </h2>
      <h2 className="text-white font-medium uppercase text-lg m-3">
        <NavLink
          to="/product"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#03AED2] border-2 border-[#03AED2] rounded-tl-xl rounded-br-xl p-1"
              : ""
          }
        >
          Product
        </NavLink>
      </h2>
    </>
  );

  return (
    <nav
      className="fixed top-0 w-full max-w-7xl mx-auto z-50  bg-gradient-to-l from-[#083f53] to-[#1c9991] border-b-[1px] border-slate-400"
    >
      <div className="navbar bg-transparent">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#1c9991] rounded-box z-[50] mt-3 w-52 p-2 shadow"
            >
              {navigationButton}
            </ul>
          </div>
          <div>
            <Link to="/">
              <img
                className="rounded-full size-12"
                src="https://i.ibb.co.com/JcVyrjg/Screenshot-3.png"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navigationButton}</ul>
        </div>
        <div className="navbar-end"></div>
        <Link to="/cart">
        <div className="relative ">
          <h2 className="text-white mr-5 text-4xl font-medium">
          <FaCartShopping>
          </FaCartShopping>
          </h2>
          <span className="text-black absolute -top-[2px] left-4 text-lg font-semibold">{cartData.length}</span>
        </div>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
