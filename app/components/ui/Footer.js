import React from "react";

const Footer = () => {
  return (
    <div className="border-t w-full text-center border-white/5 p-5">
      <p className="hidden xl:block text-xs text-surface-muted">
        © {new Date().getFullYear()}{" "}
        <b className="uppercase text-amber-400">Velocity Dispatch</b> All rights
        reserved.
      </p>

      <p className="xl:hidden text-center text-xs text-surface-muted">
        © {new Date().getFullYear()} <b>Velocity Dispatch</b>
      </p>
    </div>
  );
};

export default Footer;
