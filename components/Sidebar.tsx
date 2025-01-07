'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react'
import Logo from '@/components/Logo'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const routes = [
  {
    href: '/',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    href: '/workflows',
    label: 'Workflows',
    icon: Layers2Icon,
  },
  {
    href: '/credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon,
  },
  {
    href: '/billing',
    label: 'Billing',
    icon: CoinsIcon,
  },
]

function DesktopSidebar() {
  const pathname = usePathname()
  const activeRoute =
    routes.find((route) => route.href.length > 0 && route.href === pathname) || routes[0]
  return (
    <div
      className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5
      dark:bg-secondary/30 dark:text-muted-foreground text-muted-foreground border-r-2 border-separate"
    >
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="p-2">TODO: Credits</div>
      <div className="flex flex-col p-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href ? 'sidebarActiveItem' : 'sidebarItem',
            })}
          >
            <route.icon size={20} />
            <span>{route.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()
  const activeRoute =
    routes.find((route) => route.href.length > 0 && route.href === pathname) || routes[0]
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant={'ghost'} size={'icon'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4" side={'left'}>
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
              <SheetDescription className="sr-only">Menu</SheetDescription>
              <div className="flex flex-col gap-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={buttonVariants({
                      variant:
                        activeRoute.href === route.href
                          ? 'sidebarActiveItem'
                          : 'sidebarItem',
                    })}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <route.icon size={20} />
                    <span>{route.label}</span>
                  </Link>
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default DesktopSidebar
