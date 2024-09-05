import React from "react";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-2 p-7 text-center text-white/80 sm:p-12">
      <div>
        Muchísimas gracias a todos los asistentes, speakers, sponsors,
        auspiciadores y voluntarios
      </div>
      <div>
        <p>
          Conviértete en auspiciador en{" "}
          <a
            href="https://communityos.io/ser-sponsor/"
            className="font-bold text-brand-primary hover:text-white"
          >
            communityos.io/ser-sponsor/
          </a>
        </p>
      </div>
    </footer>
  );
};
