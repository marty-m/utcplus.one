import AccountDropdown from "./account_dropdown";
import CartDropdown from "./cart_dropdown";

export default function Navbar() {
    

    return(


  
  <div className="navbar bg-white fixed top-0 border border-b-black" tabIndex={0}>
  <div className="navbar-start">
  <label htmlFor="my-drawer" className="btn btn-link drawer-button ">
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </label>
  </div>

  <div className="navbar-center">
  <a href="/">
    <div className="avatar">
      <div className="w-20">
        <img src="/utcplusoneblack.svg" alt="company logo" />
      </div>
    </div>
    </a>

  </div>
  <div className="navbar-end">
    <button className="btn btn-link btn-square">
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    </button>

    <AccountDropdown/>
    <CartDropdown/>
  </div>
</div>
      


    )
}