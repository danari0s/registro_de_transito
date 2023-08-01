El cliente front necesita instalar la extensión para el navegador Solflare (wallet que soporta Solana para gestionar las transacciones desde la interfaz web del navegador). Una vez instalado y configurado, mover a Solflare a la red develop (Click en la ruedita de configuración -> Network -> Devnet).

    Para el backend:
        Se necesita instalar los siguientes requisitos:
            * NodeJS
                apt install nodejs npm -y
                (Versión de nodejs instalada en pruebas: v18.13.0)
            * npm
                (Versión de npm instalada en pruebas: 9.2.0)
            * Yarn
                npm install -g yarn
                (Versión instalada de yarn en pruebas: 1.22.19)
            * Solana Tool Suite
                sh -c "$(curl -sSfL https://release.solana.com/v1.16.5/install)"
            * Rust
                curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
                (Versión instalada de RustUp(rustup) en pruebas: 1.26.0)
                (Versión instalada de Cargo (manejador de paquetes de Rust) en pruebas: 1.71.0)
            * Anchor (Framework para desarrollo de smart contracts con solana)
                cargo install --git https://github.com/project-serum/anchor anchor-cli --locked
                (Versión instalada de Anchor en pruebas: 0.28.0)
            * Mocha (framework javascript para pruebas unitarias)
                npm install -g mocha
                (Versión instalada de Anchor en pruebas: 10.2.0)

        La primera vez que se instala solana hay que crear un par de llaves pública-privada:
            solana-keygen new
        Para trabajar con solana en devnet se usa el siguiente comando:
            solana config set --url https://api.devnet.solana.com
        Para ver la dirección de la wallet del servidor:
            solana address

Ejecutar el servidor web con el comando:
    npm run dev
