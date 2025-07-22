export const variantStyles = {
  blue: {
    cardBg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    titleColor: 'text-blue-700 dark:text-blue-300',
    iconColor: 'text-blue-600 dark:text-blue-400',
    valueColor: 'text-blue-900 dark:text-blue-100',
    descriptionColor: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    cardBg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    titleColor: 'text-green-700 dark:text-green-300',
    iconColor: 'text-green-600 dark:text-green-400',
    valueColor: 'text-green-900 dark:text-green-100',
    descriptionColor: 'text-green-600 dark:text-green-400',
  },
  purple: {
    cardBg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    titleColor: 'text-purple-700 dark:text-purple-300',
    iconColor: 'text-purple-600 dark:text-purple-400',
    valueColor: 'text-purple-900 dark:text-purple-100',
    descriptionColor: 'text-purple-600 dark:text-purple-400',
  },
  orange: {
    cardBg: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    titleColor: 'text-orange-700 dark:text-orange-300',
    iconColor: 'text-orange-600 dark:text-orange-400',
    valueColor: 'text-orange-900 dark:text-orange-100',
    descriptionColor: 'text-orange-600 dark:text-orange-400',
  },
};

export function getVariantStyles(variant: keyof typeof variantStyles) {
  return variantStyles[variant];
}