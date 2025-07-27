'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@enterprise/ui/lib/utils'

interface MobileNavProps {
    isOpen: boolean
    onClose: () => void
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
    const t = useTranslations()
    const [openSection, setOpenSection] = useState<string | null>(null)

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section)
    }

    const classItems = [
        { key: 'hsc', icon: 'H', color: 'bg-red-500' },
        { key: 'class_ten', icon: '10', color: 'bg-yellow-500' },
        { key: 'class_nine', icon: '9', color: 'bg-green-500' },
        { key: 'class_eight', icon: '8', color: 'bg-orange-500' },
        { key: 'class_seven', icon: '7', color: 'bg-yellow-600' },
        { key: 'class_six', icon: '6', color: 'bg-blue-500' }
    ]

    const skillsItems = [
        { key: 'all_courses', icon: '💎', color: 'bg-blue-500' },
        { key: 'language_learning', icon: '🗣️', color: 'bg-green-500' },
        { key: 'freelancing', icon: '💰', color: 'bg-orange-500' },
        { key: 'bundle', icon: '🎁', color: 'bg-red-500' },
        { key: 'skills_it', icon: '🔧', color: 'bg-blue-600' },
        { key: 'design_creative', icon: '🎨', color: 'bg-purple-500' },
        { key: 'career_readiness', icon: '👤', color: 'bg-orange-600' },
        { key: 'kids', icon: '🧒', color: 'bg-green-600' },
        { key: 'professional', icon: '👔', color: 'bg-red-600' },
        { key: 'free', icon: '🆓', color: 'bg-purple-600' }
    ]

    const onlineBatchItems = [
        { key: 'class_six_ten', icon: '📚', color: 'bg-blue-500' },
        { key: 'hsc_program', icon: '🎓', color: 'bg-red-500' }
    ]

    const englishCentreItems = [
        { key: 'ielts', icon: '🌍', color: 'bg-blue-600' },
        { key: 'spoken_english', icon: '🎯', color: 'bg-green-600' },
        { key: 'business_english', icon: '💼', color: 'bg-purple-600' },
        { key: 'kids_english', icon: '👶', color: 'bg-orange-600' },
        { key: 'english_foundation', icon: '📖', color: 'bg-red-600' }
    ]

    const moreItems = [
        'job_preparation',
        'blog',
        'book_store',
        'free_notes',
        'academic_content',
        'verify_certificate',
        'career_recruitment',
        'join_teacher',
        'join_affiliate'
    ]

    return (
        <div
            className={ cn(
                'fixed inset-0 z-50 lg:hidden',
                isOpen ? 'visible' : 'invisible'
            ) }
        >
            {/* Backdrop */ }
            <div
                className={ cn(
                    'absolute inset-0 bg-black/50 transition-opacity',
                    isOpen ? 'opacity-100' : 'opacity-0'
                ) }
                onClick={ onClose }
            />

            {/* Menu */ }
            <div
                className={ cn(
                    'absolute right-0 top-0 h-full w-80 max-w-full bg-background shadow-lg transition-transform',
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                ) }
            >
                <div className="flex h-full flex-col">
                    {/* Header */ }
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-lg font-semibold">Menu</h2>
                        <button
                            onClick={ onClose }
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Items */ }
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-4">
                            {/* Class 6-12 */ }
                            <div>
                                <button
                                    onClick={ () => toggleSection('class6_12') }
                                    className="flex w-full items-center justify-between py-2 text-left font-medium"
                                >
                                    { t('Header.nav.class6_12') }
                                    <ChevronDown
                                        className={ cn(
                                            'h-4 w-4 transition-transform',
                                            openSection === 'class6_12' && 'rotate-180'
                                        ) }
                                    />
                                </button>
                                { openSection === 'class6_12' && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        { classItems.map((item) => (
                                            <Link
                                                key={ item.key }
                                                href={ `/class/${item.key}` }
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                onClick={ onClose }
                                            >
                                                <div className={ `w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold` }>
                                                    { item.icon }
                                                </div>
                                                <span className="text-sm">{ t(`Navigation.class6_12.${item.key}`) }</span>
                                            </Link>
                                        )) }
                                    </div>
                                ) }
                            </div>

                            {/* Skills */ }
                            <div>
                                <button
                                    onClick={ () => toggleSection('skills') }
                                    className="flex w-full items-center justify-between py-2 text-left font-medium"
                                >
                                    { t('Header.nav.skills') }
                                    <ChevronDown
                                        className={ cn(
                                            'h-4 w-4 transition-transform',
                                            openSection === 'skills' && 'rotate-180'
                                        ) }
                                    />
                                </button>
                                { openSection === 'skills' && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        { skillsItems.map((item) => (
                                            <Link
                                                key={ item.key }
                                                href={ `/skills/${item.key}` }
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                onClick={ onClose }
                                            >
                                                <div className={ `w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs` }>
                                                    { item.icon }
                                                </div>
                                                <span className="text-sm">{ t(`Navigation.skills.${item.key}`) }</span>
                                            </Link>
                                        )) }
                                    </div>
                                ) }
                            </div>

                            {/* Admission Link */ }
                            <div>
                                <Link
                                    href="/admission"
                                    className="block py-2 text-left font-medium hover:text-primary transition-colors"
                                    onClick={ onClose }
                                >
                                    { t('Header.nav.admission') }
                                </Link>
                            </div>

                            {/* Online Batch */ }
                            <div>
                                <button
                                    onClick={ () => toggleSection('online_batch') }
                                    className="flex w-full items-center justify-between py-2 text-left font-medium"
                                >
                                    { t('Header.nav.online_batch') }
                                    <ChevronDown
                                        className={ cn(
                                            'h-4 w-4 transition-transform',
                                            openSection === 'online_batch' && 'rotate-180'
                                        ) }
                                    />
                                </button>
                                { openSection === 'online_batch' && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        { onlineBatchItems.map((item) => (
                                            <Link
                                                key={ item.key }
                                                href={ `/online-batch/${item.key}` }
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                onClick={ onClose }
                                            >
                                                <div className={ `w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs` }>
                                                    { item.icon }
                                                </div>
                                                <span className="text-sm">{ t(`Navigation.online_batch.${item.key}`) }</span>
                                            </Link>
                                        )) }
                                    </div>
                                ) }
                            </div>

                            {/* English Centre */ }
                            <div>
                                <button
                                    onClick={ () => toggleSection('english_centre') }
                                    className="flex w-full items-center justify-between py-2 text-left font-medium"
                                >
                                    { t('Header.nav.english_centre') }
                                    <ChevronDown
                                        className={ cn(
                                            'h-4 w-4 transition-transform',
                                            openSection === 'english_centre' && 'rotate-180'
                                        ) }
                                    />
                                </button>
                                { openSection === 'english_centre' && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        { englishCentreItems.map((item) => (
                                            <Link
                                                key={ item.key }
                                                href={ `/english-centre/${item.key}` }
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors"
                                                onClick={ onClose }
                                            >
                                                <div className={ `w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white text-xs` }>
                                                    { item.icon }
                                                </div>
                                                <span className="text-sm">{ t(`Navigation.english_centre.${item.key}`) }</span>
                                            </Link>
                                        )) }
                                    </div>
                                ) }
                            </div>

                            {/* More */ }
                            <div>
                                <button
                                    onClick={ () => toggleSection('more') }
                                    className="flex w-full items-center justify-between py-2 text-left font-medium"
                                >
                                    { t('Header.nav.more') }
                                    <ChevronDown
                                        className={ cn(
                                            'h-4 w-4 transition-transform',
                                            openSection === 'more' && 'rotate-180'
                                        ) }
                                    />
                                </button>
                                { openSection === 'more' && (
                                    <div className="mt-2 space-y-1 pl-4">
                                        { moreItems.map((item) => (
                                            <Link
                                                key={ item }
                                                href={ `/${item.replace('_', '-')}` }
                                                className="block p-2 text-sm rounded-lg hover:bg-accent transition-colors"
                                                onClick={ onClose }
                                            >
                                                { t(`Navigation.more.${item}`) }
                                            </Link>
                                        )) }
                                    </div>
                                ) }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileNav
