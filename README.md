# GitGlance

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AshishKumar4/gitlance)

GitGlance is a visually stunning, minimalist clone of GitHub, meticulously crafted with a focus on a clean user interface and an exceptional code browsing experience. The application allows users to view developer profiles, browse their repositories, navigate through file structures, and view code with elegant syntax highlighting. The design prioritizes clarity, performance, and a modern aesthetic, built on a serverless architecture using Cloudflare Workers and Durable Objects for a fast, globally distributed experience.

## Key Features

-   **User Profiles:** View developer details, including avatar, bio, stats, and a grid of their top repositories.
-   **Repository Browsing:** An immersive code browsing experience with a file tree for easy navigation.
-   **Code Viewer:** Read file content and source code with elegant syntax highlighting.
-   **Minimalist UI:** A clean, dark-themed design inspired by modern developer tools.
-   **Responsive Design:** Flawless layouts across all device sizes, from mobile to desktop.
-   **High-Performance:** Built on Cloudflare's serverless platform for a globally fast and responsive experience.

## Technology Stack

-   **Frontend:**
    -   React & Vite
    -   React Router for client-side routing
    -   Tailwind CSS for styling
    -   shadcn/ui for the component library
    -   Zustand for state management
    -   Framer Motion for animations
    -   Lucide React for icons
-   **Backend:**
    -   Cloudflare Workers for serverless compute
    -   Hono as the routing framework
    -   Cloudflare Durable Objects for persistent state
-   **Language:** TypeScript

## Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   A [Cloudflare account](https://dash.cloudflare.com/sign-up).
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and configured.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/gitglance.git
    cd gitglance
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Running Locally

To start the development server, which includes both the Vite frontend and the Wrangler dev server for the worker, run:

```sh
bun run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your environment).

## Development

-   **Frontend Code:** Located in the `src` directory. This includes React components, pages, hooks, and styles.
-   **Backend Code:** Located in the `worker` directory. This contains the Hono application, routes, and the Durable Object implementation.
-   **Shared Code:** The `shared` directory contains TypeScript types and mock data shared between the frontend and backend.

To check for linting issues, run:
```sh
bun run lint
```

## Deployment

This project is designed for seamless deployment to Cloudflare's serverless platform.

1.  **Build the application:**
    This command bundles both the frontend assets and the worker code.
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    This command publishes your application to your Cloudflare account.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy your own version of GitGlance with a single click.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/AshishKumar4/gitlance)

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.