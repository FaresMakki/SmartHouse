import {ExclamationTriangleIcon} from "@radix-ui/react-icons"

interface FormErrorProps {
    message?: string;
}

export const FormError = ({message}: FormErrorProps) => {
    if (!message) return null;
    return (
        <div className={"flex bg-red-400/10 p-3 rounded-md items-center gap-x-2 text-destructive text-sm"}>
            <ExclamationTriangleIcon className={"h-4 w-4"}/>
            <p>{message}</p>
        </div>
    );
};