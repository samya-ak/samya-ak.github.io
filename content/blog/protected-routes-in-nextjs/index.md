---
title: Protected routes in next.js
date: "2023-04-09"
description: "Protected routes from react to next.js"
subject: ["ts", "next.js", "react"]
---

#### The Premise

Protected routes allow you to prevent users from accessing certain routes based on the conditions you set. For example, only logged in users can visit the `/profile` page. 

Coming from the react and react router background, implementing protected routes was as simple as creating a component. This component would take React Node as a prop and return React Node only if certain conditions are met or you would redirect the user to other pages. 

This is how the code for above might look like

```ts
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "utils";

const ProtectedRoute = ({ children }: ReactNode) => {	
  if (isAuthenticated()) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
```

And you would use the `ProtectedRoute` component like

```ts
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
```

Since Next.js uses a file-system based routing, we need to take a different approach to implement something like protected routes. 

#### The Failures

Lets look into implementing public and private routes using the concept of protected routes. A quick search on the web suggested an approach where you would use the react’s useContext hook to check if a user is authenticated and pass authentication state to its children (a next.js page in this case) using a provider. Then, in each page you would implement a useEffect hook with an empty dependency array to manually redirect to another page if the user is not authenticated.

There’s a problem here. The need to repeat useEffect in every page is an absolute wack idea. Is there a way that would abstain us from repeating useEffect in every page? Yes, higher order components to the rescue.

We want to prevent unauthenticated users from accessing private routes and also prevent authenticated users from going back to pages accessible to only unauthenticated users. Logged in users should not be able to navigate to the login page. To achieve this, I created two HOCs - withAuth and withGuest. withAuth is for private pages and withGuest is for public pages. Note that we are not using context API here.

```ts
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isAuthenticated } from '/utils/auth'

const withAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  const Auth: React.FC<P> = (props) => {
    const router = useRouter()

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/login')
      }
    }, [])

    return <Component {...props} />
  }

  return Auth
}

export default withAuth
```

```ts
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { isAuthenticated} from '/utils/auth'

const withGuest = <P extends object>(
  Component: React.ComponentType<P>): React.FC<P> => {
  const Guest: React.FC<P> = (props) => {
    const router = useRouter()

    useEffect(() => {
      const currentPath = router.asPath
      // if user tries to visit un-authenticated pages when user is already logged in
      if (isAuthenticated()) {
        router.push('/dashboard')
      }
    }, [])

    return <Component {...props} />
  }

  return Guest
}

export default withGuest
```

You would then use these HOC like

```ts
import withAuth from '/withAuth'

const Dashboard = () => {
  return <>Dashboard</>
}

export default withAuth(Dashboard)
```

It seemed that everything was working as expected. But there was this one annoying issue. Let's say that you try to go to the dashboard page without logging in. With our current implementation, the application would redirect you to the dashboard page, render its JSX and then run useEffect which would eventually redirect you back to the login page. Due to this, the user would see the dashboard page for a moment before being redirected to the login page - just a flicker.

#### Okay solution for now

Nope! Scratch the idea of HOC as well. Lets look into middleware in next.js.

> Middleware allows you to run code before a request is completed, then based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Looks like just what we need.
In a file named middleware.ts placed in your root or src directory -

```ts
import { NextRequest, NextResponse } from 'next/server';

const UNAUTH_URLS = {
      login: '/login'
 }

const AUTH_URLS = {
      dashboard: '/dashboard'
}

const DEFAULT_UNAUTH_URL = '/login';
const DEFAULT_AUTH_URL = '/dashboard';

export const middleware = async (request: NextRequest) => {
  const accessToken = request.cookies.get('accessToken');
  const currUrl = request.nextUrl.pathname;

  const isUnauthPath = Object.values(UNAUTH_URLS).some((path) =>
    currUrl?.includes(path)
  );
  const isAuthPath = Object.values(AUTH_URLS).some((path) => {
    return currUrl?.includes(path);
  });

  // when user is not logged in and tries to access authenticated pages
  if (!accessToken && isAuthPath) {
    return NextResponse.redirect(new URL(DEFAULT_UNAUTH_URL, request.url));
  }

  // when user is logged in  and tries to access un-authenticated pages
  if (isUnauthPath && accessToken) {
    return NextResponse.redirect(new URL(DEFAULT_AUTH_URL, request.url));
  }

  return NextResponse.next();
};

// ignore middeleware for routes that start with /_next or /static or /api
export const config = {
  matcher: ['/((?!_next|static|api|favicon.ico|images).*)(.+)'],
};
```


#### Reference

- [Protected routes in next.js](https://dev.to/seven/how-to-implement-protected-routes-in-nextjs-1m50)
- [Middleware in next.js](https://nextjs.org/docs/advanced-features/middleware)
