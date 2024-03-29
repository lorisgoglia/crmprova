import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import CollaboratorEditContent, { FormikRef } from './CollaboratorEditContent'
import { setDrawerClose, useAppDispatch, useAppSelector } from '../store'
import type { MouseEvent } from 'react'

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={onCancel}>
                Chiudi
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                Salva
            </Button>
        </div>
    )
}

const CollaboratorEditDialog = () => {
    const dispatch = useAppDispatch()
    const drawerOpen = useAppSelector(
        (state) => state.collaborators.data.drawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setDrawerClose())
    }

    const formikRef = useRef<FormikRef>(null)

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Drawer
            width={1200}
            isOpen={drawerOpen}
            closable={false}
            bodyClass="p-0"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
        >
            <CollaboratorEditContent ref={formikRef} />
        </Drawer>
    )
}

export default CollaboratorEditDialog
