import React from 'react'
import { Link } from 'react-router-dom'
import { LogOutIcon } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@radix-ui/react-accordion'
import { cn } from '@/utils/utils'
import NavLink from './NavLink'
import { CALCULATOR_ROUTES, ROUTES } from '@/utils/app-shell'
import { Button } from '@/components/ui/button'
import { useAuthContext } from '@/hooks/use-auth'
import When from '@/components/When/When'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import DownloadAllData from '@/components/DownloadAllData/DownloadAllData'

type SidebarProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({ className, ...restProps }: SidebarProps) {
  const { userData, logout } = useAuthContext()

  return (
    <div className={cn('border-r h-full', className)} {...restProps}>
      <div className='space-y-4 py-4 h-full flex flex-col justify-between px-3'>
        <div>
          <Link className='text-center text-2xl font-bold text-primary block' to='/dashboard'>
            finuncle
          </Link>

          <div className='space-y-1 py-2'>
            {ROUTES.map((route) => (
              <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
            ))}
          </div>

          <Accordion type='single' collapsible>
            <AccordionItem value='item-1' className='border'>
              <AccordionTrigger className='bg-slate-100 px-3'>Calculators</AccordionTrigger>
              <AccordionContent className='space-y-1 py-2'>
                {CALCULATOR_ROUTES.map((route) => (
                  <NavLink key={route.path} to={route.path} label={route.label} icon={route.icon} />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className='space-y-2'>
          <DownloadAllData className='w-full' />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='w-full'>
                @{userData?.username}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <When truthy={Boolean(userData?.email)}>
                <DropdownMenuLabel>{userData?.email}</DropdownMenuLabel>
              </When>

              <DropdownMenuItem className='cursor-pointer' asChild>
                <Link to='/profile'>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='cursor-pointer' onClick={logout}>
                <LogOutIcon className='mr-2 h-4 w-4' />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
