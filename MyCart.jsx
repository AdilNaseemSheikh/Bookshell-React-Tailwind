import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Empty from "../empty/empty";
import { useDispatch, useSelector } from "react-redux";
import { setCartOpen, removeFromCart, updateQuantity } from "../../slices/cart";

export default function MyCart() {
  const open = useSelector((state) => state.cart.open);
  const products = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleIncreaseQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity < product.stocksLeft) {
      dispatch(
        updateQuantity({ id: productId, quantity: product.quantity + 1 })
      );
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.quantity > 1) {
      dispatch(
        updateQuantity({ id: productId, quantity: product.quantity - 1 })
      );
    }
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart(productId));
    toast("Item removed from cart", { type: "success" });
  };

  const calculateSubtotal = () => {
    return products
      ?.reduce((total, product) => total + product.price * product.quantity, 0)
      .toFixed(2);
  };

  return (
    <Transition show={open}>
      <Dialog
        className="relative z-10"
        onClose={() => dispatch(setCartOpen(false))}
      >
        <TransitionChild
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <DialogTitle className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </DialogTitle>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => dispatch(setCartOpen(false))}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {products?.length ? (
                              products?.map((product) => (
                                <li key={product.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <span>{product.title}</span>
                                        </h3>
                                        <p className="ml-4">
                                          PKR {product.price.toFixed(2)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleDecreaseQuantity(product.id)
                                          }
                                        >
                                          -
                                        </button>
                                        <p className="mx-2 text-gray-500">
                                          {product.quantity}
                                        </p>
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleIncreaseQuantity(product.id)
                                          }
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            handleRemoveProduct(product.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))
                            ) : (
                              <Empty />
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>PKR {calculateSubtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                          onClick={() => dispatch(setCartOpen(false))}
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <Link
                            to="/"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => dispatch(setCartOpen(false))}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
