# CMB Brand Logo Placement Design

**Goal:** Surface the supplied China Merchants Bank brand image prominently without obstructing customer lookup and KYC workflows.

**Design:** Place the image in the persistent top navigation, left of the platform name. Use a fixed white brand plate with centered cover cropping to remove the source image's excess whitespace while retaining the logo, Chinese name, and English name. Scale the plate down on mobile and publish the image as a static media asset.

**Verification:** Static checks assert the image reference and crop behavior; the static build must emit `dist/media/cmb_logo_transparent.png`.
