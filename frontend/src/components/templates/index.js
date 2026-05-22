import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import TechStartupTemplate from './TechStartupTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import AcademicTemplate from './AcademicTemplate';
import BeigeGeometricTemplate from './BeigeGeometricTemplate';
import ElegantSidebarTemplate from './ElegantSidebarTemplate';
import PremiumStylishTemplate from './PremiumStylishTemplate';

export const templates = {
  modern: { id: 'modern', name: 'Modern Style', Component: ModernTemplate },
  professional: { id: 'professional', name: 'Professional Clean', Component: ProfessionalTemplate },
  creative: { id: 'creative', name: 'Creative Designer', Component: CreativeTemplate },
  executive: { id: 'executive', name: 'Executive Officer', Component: ExecutiveTemplate },
  startup: { id: 'startup', name: 'Tech Startup', Component: TechStartupTemplate },
  minimalist: { id: 'minimalist', name: 'Ultra Minimalist', Component: MinimalistTemplate },
  academic: { id: 'academic', name: 'Harvard Academic', Component: AcademicTemplate },
  beige: { id: 'beige', name: 'Cream Geometry', Component: BeigeGeometricTemplate },
  elegant: { id: 'elegant', name: 'Elegant Sidebar', Component: ElegantSidebarTemplate },
  premium: { id: 'premium', name: 'Premium Stylish', Component: PremiumStylishTemplate }
};
