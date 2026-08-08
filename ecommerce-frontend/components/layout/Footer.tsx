export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} E-Shop - Tous droits réservés</p>
        <p className="mt-1">Built with ❤️ using Next.js 14 & Microservices</p>
      </div>
    </footer>
  );
}