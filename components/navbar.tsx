import AccountDropdown from "./account_dropdown";

export default function Navbar() {
    return(

<div className="drawer" tabIndex={1}>
  <input id="my-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
  <div className="navbar bg-base-000">
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

    {AccountDropdown()}
    <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-link btn-square">
        <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
          <span className="badge badge-sm indicator-item">8</span>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
        <div className="card-body">
          <span className="font-bold text-lg">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-accent btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
    
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
      
    </ul>
  </div>
</div>
      


    )
}