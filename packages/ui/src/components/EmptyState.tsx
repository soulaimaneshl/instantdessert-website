interface EmptyStateAction {
  label: string
  href?: string
  onClick?: () => void
}

interface EmptyStateProps {
  icon?: string
  message: string
  action?: EmptyStateAction
}

export function EmptyState({ icon = '🍰', message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-12 px-6 text-center">
      <span className="text-5xl" aria-hidden="true">{icon}</span>
      <p className="font-body text-chocolat/60 text-sm max-w-xs leading-relaxed">
        {message}
      </p>
      {action && (
        action.href ? (
          <a
            href={action.href}
            className="min-h-[44px] inline-flex items-center px-6 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            {action.label}
          </a>
        ) : (
          <button
            onClick={action.onClick}
            className="min-h-[44px] px-6 py-2 bg-rose text-white font-body text-sm rounded-full hover:opacity-90 transition-opacity"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
