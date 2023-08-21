"use client"
import useCartStore from "@/app/_stores/cartStore"

export default function CartDropdown(){
    const items = useCartStore((state) => state.items)
    const totalPrice = useCartStore((state) => state.totalPrice())

    return (
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-link btn-square">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg>
                <span className="badge badge-sm indicator-item">{items.length}</span>
                </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="font-bold text-lg">{items.length} Items</span>
                <span className="text-info">Subtotal: ${totalPrice}</span>
                <div className="card-actions">
                    <button className="btn btn-accent btn-block">View cart</button>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}